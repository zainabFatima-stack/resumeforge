from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.core.database import Base, engine
from app.api import auth, resume, ai, export


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create all tables on startup
    Base.metadata.create_all(bind=engine)
    print(f"✅ ResumeForge v{settings.VERSION} started")
    print("📚 API Docs available at /docs")
    yield
    print("🛑 Shutting down...")


app = FastAPI(
    title="ResumeForge API",
    description="🚀 The most 🔥 open-source AI-powered resume builder",
    version=settings.VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://resumeforge-ffd9.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(resume.router)
app.include_router(ai.router)
app.include_router(export.router)


@app.get("/")
async def root():
    return {
        "app": "ResumeForge",
        "version": settings.VERSION,
        "status": "🟢 Online",
        "docs": "/docs"
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}
