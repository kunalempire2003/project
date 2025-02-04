# Event Scraper

## Overview
This project is a full-stack Node.js web application that:
- Scrapes event listings from **Eventbrite (Sydney, Australia)** using **Cheerio** and **Axios**.
- Displays the event details on a webpage.
- Provides a **"Get Ticket"** button for each event.
- Prompts users to enter their email before redirecting them to the event page.
- Sends a confirmation email with the event link using **Nodemailer**.
- Automatically updates event listings every 24 hours using **CronJob**.

## Project Structure
```
/event-scraper
│── server.js         # Backend with Express, Cheerio, and Axios
│── public/
│   ├── index.html    # Frontend UI to display events
│   ├── script.js     # Handles user interactions
│   ├── styles.css    # Styles for the webpage
│── package.json      # Node.js dependencies
│── README.md         # Project documentation
```

## Technologies Used
- **Node.js** (Backend)
- **Express.js** (Web Server)
- **Cheerio.js** (Web Scraping)
- **Axios** (HTTP Requests)
- **Nodemailer** (Email Sending)
- **CronJob** (Automated Scheduling)
- **HTML, CSS, JavaScript** (Frontend)

## Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/event-scraper.git
cd event-scraper
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Run the Server
```sh
node server.js
```

### 4️⃣ Access the Website
Open a browser and go to:
```
http://localhost:3000
```

## Features
✅ **Scrape Events** - Fetches events from Eventbrite Sydney.
✅ **Display Events** - Shows event title, date, and a **Get Ticket** button.
✅ **Email Confirmation** - Sends a confirmation email before redirecting users.
✅ **Automatic Updates** - Refreshes event listings every 24 hours using **CronJob**.

## API Endpoints
| Endpoint            | Method | Description |
|---------------------|--------|-------------|
| `/api/events`      | GET    | Fetches the latest event listings |
| `/api/get-ticket`  | POST   | Sends a confirmation email & redirects user |

## Future Improvements
- Implement **database storage** for event history.
- Add **user authentication** for ticket reservations.
- Enable **multiple cities** selection.
- Improve **UI/UX** with animations and filters.

---
screenshots-
![image](https://github.com/user-attachments/assets/143e73d8-f957-4b11-8d36-1913561233d0)
![image](https://github.com/user-attachments/assets/a485c0a0-0720-4474-9848-4721d50c7fa9)
![image](https://github.com/user-attachments/assets/0c1c758e-2396-455b-9fe7-921fafc346a2)




