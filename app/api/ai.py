from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from app.core.security import get_current_user
from app.models.user import User
from app.services.ai_service import AIService

router = APIRouter(prefix="/api/ai", tags=["AI"])

ai_service = AIService()


class BulletEnhanceRequest(BaseModel):
    bullet: str
    job_title: Optional[str] = ""
    company: Optional[str] = ""


class SummaryRequest(BaseModel):
    job_title: str
    years_experience: int
    skills: List[str] = []
    tone: Optional[str] = "professional"  # professional, creative, technical


class SkillsRequest(BaseModel):
    job_description: str


class ATSRequest(BaseModel):
    resume_text: str
    job_description: str


@router.post("/enhance-bullet")
async def enhance_bullet(
    request: BulletEnhanceRequest,
    current_user: User = Depends(get_current_user)
):
    """Enhance a resume bullet point with action verbs and metrics."""
    result = await ai_service.enhance_bullet(
        bullet=request.bullet,
        job_title=request.job_title,
        company=request.company
    )
    return {"enhanced": result}


@router.post("/generate-summary")
async def generate_summary(
    request: SummaryRequest,
    current_user: User = Depends(get_current_user)
):
    """Generate a professional summary."""
    result = await ai_service.generate_summary(
        job_title=request.job_title,
        years_experience=request.years_experience,
        skills=request.skills,
        tone=request.tone
    )
    return {"summary": result}


@router.post("/extract-skills")
async def extract_skills(
    request: SkillsRequest,
    current_user: User = Depends(get_current_user)
):
    """Extract relevant skills from a job description."""
    result = await ai_service.extract_skills(job_description=request.job_description)
    return {"skills": result}


@router.post("/ats-score")
async def ats_score(
    request: ATSRequest,
    current_user: User = Depends(get_current_user)
):
    """Analyze ATS compatibility and suggest improvements."""
    result = await ai_service.analyze_ats(
        resume_text=request.resume_text,
        job_description=request.job_description
    )
    return result
