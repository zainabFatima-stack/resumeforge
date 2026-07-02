# 🚀 ResumeForge

<div align="center">

![ResumeForge Banner](https://img.shields.io/badge/ResumeForge-v1.0.0-6C63FF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xNCAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWOGwtNi02eiIvPjwvc3ZnPg==)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-00C7B7?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**The most 🔥 open-source AI-powered resume builder. 15 stunning templates. Free forever.**

[Live Demo](#) • [Quick Start](#-quick-start) • [Deploy Guide](#-deployment-guide) • [Contributing](#-contributing)

</div>

---

## ✨ Features

- 🎨 **15 Stunning Templates** — From minimal to creative, dark to colorful
- 🤖 **AI-Powered** — Free AI suggestions via Groq API (llama3-70b)
- 🔐 **JWT Authentication** — Secure login, register, OAuth-ready
- 📄 **Multi-format Export** — Download as `.docx`, `.pdf`, `.json`
- 🌙 **Dark Mode** — Because your eyes deserve it
- 📱 **Fully Responsive** — Looks great on any device
- 🐘 **PostgreSQL** — Production-grade database
- ⚡ **Real-time Preview** — See changes instantly
- 🎯 **ATS Optimized** — Beat the bots
- 🌍 **Deploy anywhere** — Railway, Render, Fly.io (all free tiers)

---

## 🗂️ Project Structure

```
resumeforge/
├── app/                    # FastAPI Backend
│   ├── api/               # Route handlers
│   │   ├── auth.py        # Authentication endpoints
│   │   ├── resume.py      # Resume CRUD endpoints
│   │   ├── ai.py          # AI suggestion endpoints
│   │   └── export.py      # Export endpoints
│   ├── core/              # Core configuration
│   │   ├── config.py      # Settings & env vars
│   │   ├── security.py    # JWT & password hashing
│   │   └── database.py    # DB connection
│   ├── models/            # SQLAlchemy models
│   │   ├── user.py
│   │   └── resume.py
│   ├── services/          # Business logic
│   │   ├── ai_service.py  # Groq AI integration
│   │   └── export_service.py # DOCX/PDF generation
│   └── main.py            # FastAPI app entry
├── frontend/              # React Frontend
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Route pages
│       ├── styles/        # CSS & themes
│       └── utils/         # Helpers & API client
├── alembic/               # DB migrations
├── .env.example           # Environment template
├── docker-compose.yml     # Local development
├── Dockerfile             # Production container
└── requirements.txt       # Python dependencies
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+ (or Docker)

### 1. Clone & Setup

```bash
git clone https://github.com/yourusername/resumeforge.git
cd resumeforge

# Copy env template
cp .env.example .env
```

### 2. Backend Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Start backend
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit: **http://localhost:5173**
API Docs: **http://localhost:8000/docs**

### 4. Using Docker (Easiest!)

```bash
docker-compose up --build
```

That's it! Everything runs automatically. 🎉

---

## 🔑 Environment Variables

Create `.env` from `.env.example`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/resumeforge

# Security
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# AI (Free - get key at console.groq.com)
GROQ_API_KEY=your-groq-api-key

# App
FRONTEND_URL=http://localhost:5173
ENVIRONMENT=development
```

---

## 🌐 Deployment Guide

### Option 1: Railway (Recommended - Free Tier)

1. Push your code to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Add PostgreSQL plugin
5. Set environment variables in Railway dashboard
6. Deploy! Railway auto-detects FastAPI

**Free tier:** 500 hours/month, $5 credit

### Option 2: Render (Free Tier)

1. Go to [render.com](https://render.com)
2. New → Web Service → Connect GitHub
3. Set build command: `pip install -r requirements.txt && alembic upgrade head`
4. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add PostgreSQL database (free tier available)
6. Set environment variables

**Free tier:** 750 hours/month (spins down after inactivity)

### Option 3: Fly.io (Always-on Free Tier)

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Launch app
fly launch

# Set secrets
fly secrets set SECRET_KEY=your-secret DATABASE_URL=your-db-url GROQ_API_KEY=your-key

# Deploy
fly deploy
```

**Free tier:** 3 shared VMs, 3GB persistent storage

### Option 4: Self-host with Docker

```bash
# On your VPS/server
git clone https://github.com/yourusername/resumeforge.git
cd resumeforge
cp .env.example .env
# Edit .env with your values
docker-compose -f docker-compose.prod.yml up -d
```

### Frontend Deployment (Vercel - Free)

```bash
# Install Vercel CLI
npm install -g vercel

cd frontend
vercel

# Set VITE_API_URL to your backend URL
vercel env add VITE_API_URL
```

---

## 🎨 Templates

| # | Name | Style | Best For |
|---|------|-------|----------|
| 1 | **Midnight Pro** | Dark, modern | Tech/Dev roles |
| 2 | **Aurora** | Gradient, colorful | Creative/Design |
| 3 | **Clean Slate** | Minimal, white | Corporate |
| 4 | **Neo Tokyo** | Cyberpunk vibes | Startup/Tech |
| 5 | **Botanical** | Green, organic | Environmental |
| 6 | **Royal Navy** | Classic blue | Finance/Law |
| 7 | **Sunset Warm** | Orange/pink warm | Marketing |
| 8 | **Mono Grid** | B&W grid layout | Architecture |
| 9 | **Neon Pulse** | Purple neon dark | Gaming/esports |
| 10 | **Paper Craft** | Textured, earthy | Education |
| 11 | **Silicon Valley** | Blue tech minimal | Engineering |
| 12 | **Rose Gold** | Pink gradient | Fashion/Beauty |
| 13 | **Executive** | Premium dark blue | C-Suite/MBA |
| 14 | **Glassmorphism** | Glass, blur effects | UI/UX Design |
| 15 | **Retro Wave** | 80s aesthetic | Creative Arts |

---

## 🤖 AI Features (Powered by Groq - Free)

- **Bullet point enhancer** — Makes your achievements pop
- **Summary writer** — Generates professional summaries
- **Skills extractor** — Suggests skills from job description
- **ATS optimizer** — Improves keyword matching

Get free API key at: https://console.groq.com

---

## 🤝 Contributing

We love contributions! See [CONTRIBUTING.md](CONTRIBUTING.md)

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

MIT License — free to use, modify, and distribute. See [LICENSE](LICENSE)

---

<div align="center">
Made with ❤️ by the open-source community
<br>
⭐ Star us on GitHub if this helped you land a job!
</div>
