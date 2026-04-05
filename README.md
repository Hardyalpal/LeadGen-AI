# LeadGen AI

LeadGen AI is a chat-based MVP that converts natural language lead requests into structured parameters, fetches mock leads, filters them, and generates a downloadable CSV.

## Features

- Chat-style frontend (HTML/CSS/JS)
- Express backend API (`POST /chat`)
- AI query parsing using OpenAI (with mock fallback)
- Mock scraper service (ready to replace with real Google Maps/API scraper)
- Filter service for conditions like rating and no website
- CSV generation and download links

## Project Structure

```
leadgen-ai/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── chat.js
│   ├── services/
│   │   ├── aiService.js
│   │   ├── scraperService.js
│   │   ├── filterService.js
│   │   └── csvService.js
│   ├── config/
│   │   └── env.js
│   └── utils/
│       └── helpers.js
├── .env
├── package.json
└── README.md
```

## Setup & Run

1. Install dependencies:

```bash
npm install
```

2. Update environment variables in `.env`:

```env
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
```

> If `OPENAI_API_KEY` is empty, the app uses a built-in mock parser.

3. Start server:

```bash
npm run dev
```

4. Open in browser:

- `http://localhost:3000`

## Example Query

- `Find 50 dermatologists in Mumbai with rating above 4 and no website`

## API Contract

### Request

`POST /chat`

```json
{
  "message": "Find 50 dermatologists in Mumbai with rating above 4 and no website"
}
```

### Response (sample)

```json
{
  "success": true,
  "parsedQuery": {
    "category": "dermatologists",
    "location": "Mumbai",
    "limit": 50,
    "filters": {
      "minRating": 4,
      "noWebsite": true
    }
  },
  "totalFound": 34,
  "message": "Found 34 leads for dermatologists in Mumbai.",
  "downloadUrl": "/downloads/leads-2026-...csv"
}
```

## Future Improvements

- Replace mock scraper with Google Maps API/scraper integration
- Add lead deduplication and validation
- Add pagination and export history
- Add auth + per-user workspace
