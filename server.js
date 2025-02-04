require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const nodemailer = require("nodemailer");
const { CronJob } = require("cron");

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Scrape events from Eventbrite (update selectors as needed)
async function scrapeEvents() {
  const url = "https://www.eventbrite.com/d/australia--sydney/events/";
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const events = [];

    // Update selectors based on the actual page structure.
    $(".eds-event-card-content__primary-content").each((index, element) => {
      const event = {
        title: $(element).find(".eds-event-card-content__title").text().trim(),
        date: $(element).find(".eds-text-bs--fixed").first().text().trim(),
        location: $(element).find(".card-text--truncated__one").text().trim(),
        // The link might be on a parent or sibling element. Adjust as needed:
        link: $(element).closest("a").attr("href"),
      };
      events.push(event);
    });

    return events;
  } catch (error) {
    console.error("Error scraping events:", error);
    return [];
  }
}

// Endpoint to return events as JSON
app.get("/events", async (req, res) => {
  const events = await scrapeEvents();
  res.json(events);
});

// Configure Nodemailer transporter (use environment variables for production)
const transporter = nodemailer.createTransport({
  service: "gmail", // or your chosen email provider
  auth: {
    user: process.env.EMAIL_USER, // loaded from .env
    pass: process.env.EMAIL_PASS, // loaded from .env
  },
});

// Endpoint to send an email
app.post("/send-email", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send("Email is required");
  }

  const mailOptions = {
    from: "process.env.EMAIL_USER",
    to: email,
    subject: "Event Updates in Sydney",
    html: `
      <p>Thank you for subscribing to event updates. We will send you the latest events in Sydney.</p>
      <p>For more details, visit <a href="https://www.eventbrite.com/d/australia--sydney/events/">this page</a>.</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email");
    }
    res.status(200).send("Email sent");
  });
});

// Schedule a cron job to fetch updated event details every 24 hours (at midnight)
const job = new CronJob("0 0 * * *", async () => {
  console.log("Fetching events...");
  await scrapeEvents();
});

job.start();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
