// Fetch and display events
async function fetchEvents() {
  // Temporarily use sample data for testing
  const events = [
    {
      title: "Sample Event 1",
      date: "March 1, 2025",
      location: "Sydney Opera House",
      link: "https://www.eventbrite.com/e/sample-event-1",
    },
    {
      title: "Sample Event 2",
      date: "March 5, 2025",
      location: "Darling Harbour",
      link: "https://www.eventbrite.com/e/sample-event-2",
    },
  ];

  const eventsList = document.getElementById("events-list");
  events.forEach((event) => {
    const eventItem = document.createElement("div");
    eventItem.classList.add("event-item");
    eventItem.innerHTML = `
      <h3>${event.title}</h3>
      <p>Date: ${event.date}</p>
      <p>Location: ${event.location}</p>
      <button class="get-tickets" data-link="${event.link}">GET TICKETS</button>
    `;
    eventsList.appendChild(eventItem);
  });
}

fetchEvents();

// Global variable to store the event link that will be used for redirection.
let selectedEventLink = "";

// When a GET TICKETS button is clicked, show the email modal.
document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("get-tickets")) {
    selectedEventLink = e.target.getAttribute("data-link");
    document.getElementById("emailModal").style.display = "flex";
  }
});

// Close modal when the close button is clicked.
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("emailModal").style.display = "none";
});

// Handle email submission.
document
  .getElementById("submitEmail")
  .addEventListener("click", async function () {
    const email = document.getElementById("emailInput").value.trim();
    if (email) {
      // Send email to the backend.
      const response = await fetch("/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Hide the modal.
        document.getElementById("emailModal").style.display = "none";
        // Redirect the user to the event's original website.
        window.location.href = selectedEventLink;
      } else {
        alert("Error sending email.");
      }
    } else {
      alert("Please enter a valid email address.");
    }
  });
