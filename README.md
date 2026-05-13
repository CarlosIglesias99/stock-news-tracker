# Stock News Logger

A full-stack website that logs all stock market news in the last 24 hours and suggests stocks to explore for investment.

---

## Features

- Aggregates stock market news using NewsAPI
- Detects ticker mentions and sentiment in articles
- Ranks suggested stocks with positive/negative sentiment
- Minimal React frontend
- Hourly news auto-refresh with Node cron job

---

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [NewsAPI Key](https://newsapi.org/)

---

### Backend

1. `cd backend`
2. Copy `.env.example` to `.env` and edit your NewsAPI key and MongoDB URI
3. `npm install`
4. Start backend: `npm start`

---

### Frontend

1. `cd frontend`
2. `npm install`
3. Start frontend: `npm start`

> Make sure backend is running on port 4000 (default) and frontend requests are sent there (`http://localhost:4000/...`).

---

## Customization

- You can swap in other news APIs or stock APIs
- Enhance ticker extraction or sentiment model
- Extend UI with charts or user accounts

---

## License

MIT
