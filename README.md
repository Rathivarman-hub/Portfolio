# 🚀 Rathivarman – Developer Portfolio

A modern, full-stack **MERN** portfolio website showcasing projects, skills, and experience. Built with React (Vite) on the frontend and Node.js + Express + MongoDB on the backend, with dynamic data management via a REST API.

---

## 🌐 Live Demo

> _Frontend deployed on **Vercel**, Backend on **Render**_

https://rathivarman-portfolio.vercel.app/

---

## ✨ Features

- 🎨 **Dark glassmorphism UI** with smooth Framer Motion animations
- 📱 **Fully responsive** design across all screen sizes
- 🗂️ **Dynamic projects section** — fetched from MongoDB via REST API
- 🛠️ **Skills section** with categorized technologies
- 📜 **Certificates section** for showcasing achievements
- 📬 **Contact form** with email integration (Gmail OAuth2 + Nodemailer)
- 🔗 **Live links & GitHub** links for every project
- 📋 **About section** with education and internship timeline

---

## 🧱 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite | UI framework & build tool |
| React Router DOM | Client-side routing |
| Framer Motion | Animations & transitions |
| Bootstrap 5 | Responsive layout utilities |
| React Icons | Icon library |
| Axios | HTTP client for API calls |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database & ODM |
| Nodemailer | Contact form emails |
| Google APIs (OAuth2) | Gmail authentication for email |
| CORS | Cross-origin request handling |
| dotenv | Environment variable management |

---

## 📁 Project Structure

```
portfolio/
├── client/                  # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/          # Project screenshots / images
│   │   ├── components/      # Reusable UI components
│   │   │   ├── About.jsx
│   │   │   ├── Certificates.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Skills.jsx
│   │   ├── context/         # React context providers
│   │   ├── pages/           # Page-level components
│   │   ├── theme/           # Theme configuration
│   │   ├── utils/           # API utility (axios instance)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                  # Node.js backend (Express)
│   ├── config/              # Database connection
│   ├── controllers/         # Route controller logic
│   ├── middleware/          # Error handling middleware
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API route definitions
│   │   ├── projectRoutes.js
│   │   ├── skillRoutes.js
│   │   └── contactRoutes.js
│   ├── scripts/             # Utility/seed scripts
│   ├── services/            # Business logic services
│   ├── server.js            # Entry point
│   └── package.json
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- npm v9+
- MongoDB Atlas account (or local MongoDB)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Rathivarman-hub/portfolio.git
cd portfolio
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ALLOWED_ORIGINS=http://localhost:5173

# Gmail OAuth2 (for Contact form)
GMAIL_CLIENT_ID=your_google_client_id
GMAIL_CLIENT_SECRET=your_google_client_secret
GMAIL_REFRESH_TOKEN=your_gmail_refresh_token
GMAIL_USER=your_email@gmail.com
```

Start the backend server:

```bash
# Development (with nodemon auto-reload)
npm run dev

# Production
npm start
```

The API will be running at `http://localhost:5000`.

---

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The frontend will be running at `http://localhost:5173`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Health check |
| GET | `/api/projects` | Fetch all projects |
| GET | `/api/skills` | Fetch all skills |
| POST | `/api/contact` | Send contact form email |

---

## 🚀 Deployment

### Frontend → Vercel

1. Push `client/` code to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Set root directory to `client`
4. Add environment variable: `VITE_API_URL=https://your-render-backend-url/api`
5. Deploy

### Backend → Render

1. Push `server/` code to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set root directory to `server`
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add all environment variables from `.env`
7. Set `ALLOWED_ORIGINS=https://your-vercel-frontend-url`
8. Deploy

---

## 🗂️ Featured Projects

| Project | Tech Stack | Live |
|---|---|---|
| **VendorBridge – Procurement ERP** | React, Node.js, MongoDB, Socket.io, JWT, Cloudinary | [Demo](https://vendor-bridge-erp-system.vercel.app/) |
| **Booking Platform** | React, Node.js, MongoDB, JWT, OTP Auth | [Demo](https://appopintment-booking.vercel.app/) |
| **EV Charging Station Platform** | React, Node.js, MongoDB, Socket.io, Google Maps API | [Demo](https://evcharging-one.vercel.app/) |
| **StockZen – Inventory Management** | React, Node.js, MongoDB, Framer Motion | [Demo](https://stockzen-ims.vercel.app/) |
| **Varun Furnitures** | React, Node.js, MongoDB, Bootstrap | [Demo](https://varun-furnitures.vercel.app/) |
| **Student Information System** | React, Node.js, MongoDB, Bootstrap | [Demo](https://student-info-system-eight.vercel.app/) |

---

## 👤 Author

**Rathivarman**
- 🎓 B.Tech CSBS — E.G.S Pillay Engineering College (2023–2027)
- 💼 Full Stack Development Intern @ Cognifyz Technologies
- 💼 Frontend Developer Intern @ CodeAlpha
- 🔗 GitHub: [Rathivarman-hub](https://github.com/Rathivarman-hub)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
