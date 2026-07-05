# Rathivarman – Portfolio

This is my personal portfolio website. I built it from scratch using the MERN stack — React on the frontend, Node.js + Express on the backend, and MongoDB to store projects and skills dynamically. I wanted it to feel like more than just a static resume page, so everything is wired up through a real API.

**Live site:** https://rathivarman-portfolio.vercel.app/

---

## What's on the site

- A home section with a short intro and my resume download
- An about section with my education and internship timeline
- A skills section grouped by category (Frontend, Backend, Database, Security, Tools)
- A projects section that pulls data from MongoDB — not hardcoded
- A certificates section with the ones I've earned so far
- A contact form that actually sends emails via Gmail OAuth2 + Nodemailer

---

## Tech used

**Frontend**
- React 19 + Vite
- Framer Motion for animations
- Bootstrap 5 for layout
- Axios for API calls
- React Icons

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- Nodemailer + Google OAuth2 (for the contact form)
- dotenv, CORS

---

## Project structure

```
portfolio/
├── client/               # React frontend
│   └── src/
│       ├── assets/
│       ├── components/   # Home, About, Skills, Projects, Certificates, Contact, Footer, Navbar
│       ├── context/
│       ├── theme/
│       ├── utils/        # Axios instance
│       ├── App.jsx
│       └── main.jsx
│
├── server/               # Express backend
│   ├── config/           # MongoDB connection
│   ├── controllers/
│   ├── models/
│   ├── routes/           # /api/projects, /api/skills, /api/contact
│   ├── scripts/          # seed.js to populate the database
│   ├── services/
│   └── server.js
│
└── README.md
```

---

## Running it locally

You'll need Node.js v18+, npm, and a MongoDB Atlas URI (or local MongoDB).

**1. Clone the repo**

```bash
git clone https://github.com/Rathivarman-hub/portfolio.git
cd portfolio
```

**2. Set up the backend**

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ALLOWED_ORIGINS=http://localhost:5173

GMAIL_CLIENT_ID=your_google_client_id
GMAIL_CLIENT_SECRET=your_google_client_secret
GMAIL_REFRESH_TOKEN=your_gmail_refresh_token
GMAIL_USER=your_email@gmail.com
```

Then start it:

```bash
npm run dev       # development (nodemon)
npm start         # production
```

API runs at `http://localhost:5000`.

**3. Seed the database**

```bash
npm run seed
```

This fills MongoDB with the default projects and skills.

**4. Set up the frontend**

```bash
cd client
npm install
```

Create a `.env` file inside `client/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Then start it:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.

---

## API endpoints

| Method | Endpoint | What it does |
|---|---|---|
| GET | `/` | Health check |
| GET | `/api/projects` | Returns all projects |
| GET | `/api/skills` | Returns all skills |
| POST | `/api/contact` | Sends an email from the contact form |

---

## Deployment

**Frontend → Vercel**
1. Connect the repo on [vercel.com](https://vercel.com)
2. Set root directory to `client`
3. Add env variable: `VITE_API_URL=https://your-render-backend-url/api`
4. Deploy

**Backend → Render**
1. Create a Web Service on [render.com](https://render.com)
2. Set root directory to `server`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all the env variables from your `.env`
6. Set `ALLOWED_ORIGINS=https://your-vercel-frontend-url`
7. Deploy

---

## Projects on the site

| Project | Stack | Live |
|---|---|---|
| VendorBridge – Procurement ERP | React, Node.js, MongoDB, Socket.io, JWT, Cloudinary | [Demo](https://vendor-bridge-erp-system.vercel.app/) |
| Booking Platform | React, Node.js, MongoDB, JWT, OTP Auth | [Demo](https://appopintment-booking.vercel.app/) |
| StockZen – Inventory Management | React, Node.js, MongoDB, Framer Motion | [Demo](https://stockzen-ims.vercel.app/) |

---

## About me

I'm Rathivarman, a third-year B.Tech CSBS student at E.G.S Pillay Engineering College (2023–2027). I've interned as a Frontend Developer at CodeAlpha and as a Full Stack Developer at Cognifyz Technologies. I mostly work with the MERN stack and enjoy building things that are actually useful.

- GitHub: [Rathivarman-hub](https://github.com/Rathivarman-hub)