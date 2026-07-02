from pydantic_settings import BaseSettings
from typing import Optional
from pydantic import Field

class Settings(BaseSettings):
    # App
    APP_NAME: str = "ResumeForge"
    VERSION: str = "1.0.0"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"

    # Database
    DATABASE_URL: str = Field(validation_alias="DATABASE_URL")

    # Security
    SECRET_KEY: str = "change-me-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours

    # AI
    GROQ_API_KEY: Optional[str] = None

    # CORS
    FRONTEND_URL: str = "https://resumeforge-ffd9.vercel.app"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
