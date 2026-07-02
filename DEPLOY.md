# 🚀 ResumeForge — Complete Step-by-Step Deployment Guide

---

## STEP 1 — Set Up Your Computer (One-Time)

Install these tools if you don't have them:

1. **Python 3.11** → https://python.org/downloads
2. **Node.js 18+** → https://nodejs.org
3. **Git** → https://git-scm.com
4. **PostgreSQL 15** → https://www.postgresql.org/download
   - OR use Docker Desktop → https://docker.com/products/docker-desktop

---

## STEP 2 — Get the Code

```bash
# Option A: Clone from GitHub (after you push it)
git clone https://github.com/YOUR_USERNAME/resumeforge.git
cd resumeforge

# Option B: Use the folder you already have
cd resumeforge
```

---

## STEP 3 — Set Up Environment Variables

```bash
# Copy the example file
cp .env.example .env
```

Now open `.env` in any text editor and fill in:
```
DATABASE_URL=postgresql://resumeforge:password@localhost:5432/resumeforge
SECRET_KEY=any-long-random-text-here-like-abc123xyz789
GROQ_API_KEY=your-key-here   <-- get free at console.groq.com
FRONTEND_URL=http://localhost:5173
```

**Get your free Groq AI key:**
1. Go to https://console.groq.com
2. Sign up free
3. Click "API Keys" → "Create API Key"
4. Copy and paste into .env

---

## STEP 4 — Set Up the Database

### Option A: Using Docker (Easiest)
```bash
docker-compose up db -d
```
That's it! Database is running.

### Option B: Using local PostgreSQL
```bash
# Open PostgreSQL terminal
psql -U postgres

# Run these commands:
CREATE DATABASE resumeforge;
CREATE USER resumeforge WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE resumeforge TO resumeforge;
\q
```

---

## STEP 5 — Run the Backend

```bash
# Create Python virtual environment
python -m venv venv

# Activate it
# On Mac/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install all Python packages
pip install -r requirements.txt

# Set up database tables
alembic upgrade head

# Start the backend server
uvicorn app.main:app --reload --port 8000
```

✅ You should see: "ResumeForge v1.0.0 started"
✅ Visit: http://localhost:8000/docs to see the API

---

## STEP 6 — Run the Frontend

Open a **new terminal window** (keep the backend running):

```bash
# Go into frontend folder
cd frontend

# Install packages
npm install

# Start the app
npm run dev
```

✅ Visit: http://localhost:5173
✅ You should see the ResumeForge homepage!

---

## STEP 7 — Test It Works

1. Go to http://localhost:5173
2. Click "Get Started Free"
3. Register an account
4. Create a resume
5. Pick a template
6. Fill in your info
7. Download as DOCX or PDF

🎉 Everything working? Now deploy it live!

---

## STEP 8 — Deploy Live (Free)

### 🏆 BEST OPTION: Railway (Easiest, Free)

**Part A — Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/resumeforge.git
git push -u origin main
```

**Part B — Deploy Backend on Railway:**
1. Go to https://railway.app and sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your resumeforge repo
4. Railway auto-detects it's a Python app
5. Click "Add Plugin" → "PostgreSQL" (free database!)
6. Railway auto-sets DATABASE_URL for you
7. Go to "Variables" tab → Add these:
   ```
   SECRET_KEY = anyRandomStringHere123
   GROQ_API_KEY = your-groq-key
   ENVIRONMENT = production
   ```
8. Click "Deploy" — wait 2 minutes
9. Go to "Settings" → Copy your public URL (like https://resumeforge.up.railway.app)

**Part C — Deploy Frontend on Vercel:**
1. Go to https://vercel.com and sign up with GitHub
2. Click "Add New" → "Project"
3. Import your resumeforge repo
4. Set "Root Directory" to `frontend`
5. Add environment variable:
   ```
   VITE_API_URL = https://resumeforge.up.railway.app
   ```
   (use your Railway URL from Part B)
6. Click "Deploy"
7. Vercel gives you a free URL like https://resumeforge.vercel.app

**Done! Your app is live! 🎉**

---

### Option 2: Render (Also Free)

**Backend:**
1. Go to https://render.com → Sign up
2. "New" → "Web Service" → Connect GitHub
3. Select your repo
4. Set:
   - Build Command: `pip install -r requirements.txt && alembic upgrade head`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Create a free PostgreSQL database on Render too
6. Add environment variables (same as Railway)

**Frontend:** Same as above using Vercel

---

### Option 3: Everything in Docker (Advanced)

```bash
# Just run this one command
docker-compose up --build

# Your app is at http://localhost:5173
```

---

## STEP 9 — Update Frontend URL (Important!)

After deploying, update your backend's CORS setting.

In Railway/Render, add this environment variable:
```
FRONTEND_URL = https://your-vercel-app.vercel.app
```

And in Vercel, update:
```
VITE_API_URL = https://your-railway-app.up.railway.app
```

---

## Troubleshooting Common Issues

**"Cannot connect to database"**
→ Make sure PostgreSQL is running
→ Check DATABASE_URL in your .env file

**"Module not found" errors**
→ Make sure you ran: `pip install -r requirements.txt`
→ Make sure your virtual environment is activated

**"CORS error" in browser**
→ Make sure FRONTEND_URL in backend matches your frontend URL exactly

**"AI not working"**
→ Add your Groq API key to .env
→ Get free key at console.groq.com

**Frontend shows blank page**
→ Make sure VITE_API_URL points to your running backend

---

## Project Structure Quick Reference

```
resumeforge/
├── app/              ← Python/FastAPI backend
│   ├── main.py       ← Start here, runs the server
│   ├── api/          ← All API endpoints
│   ├── models/       ← Database tables
│   ├── services/     ← AI + Export logic
│   └── core/         ← Config, security, database
├── frontend/         ← React frontend
│   └── src/
│       ├── pages/    ← Login, Dashboard, Editor
│       ├── components/ ← ResumePreview (15 templates)
│       └── utils/    ← API calls, template data
├── .env              ← Your secrets (never commit this!)
├── requirements.txt  ← Python packages
├── docker-compose.yml ← Run everything with Docker
└── Dockerfile        ← Production container
```

---

## Free Services Used

| Service | What For | Free Tier |
|---------|----------|-----------|
| Railway | Host backend | 500hr/month |
| Vercel | Host frontend | Unlimited |
| Supabase/Railway | PostgreSQL DB | 500MB free |
| Groq | AI (llama3-70b) | Free API |
| GitHub | Code storage | Unlimited |

**Total cost: $0 forever** ✅
