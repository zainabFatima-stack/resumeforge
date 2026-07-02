from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.resume import Resume

router = APIRouter(prefix="/api/resumes", tags=["Resumes"])


# --- Pydantic Schemas ---
class PersonalInfo(BaseModel):
    full_name: Optional[str] = ""
    title: Optional[str] = ""
    email: Optional[str] = ""
    phone: Optional[str] = ""
    location: Optional[str] = ""
    website: Optional[str] = ""
    linkedin: Optional[str] = ""
    github: Optional[str] = ""


class ExperienceItem(BaseModel):
    id: Optional[str] = None
    company: str
    position: str
    start_date: str
    end_date: Optional[str] = "Present"
    location: Optional[str] = ""
    description: List[str] = []
    current: bool = False


class EducationItem(BaseModel):
    id: Optional[str] = None
    institution: str
    degree: str
    field: Optional[str] = ""
    start_date: str
    end_date: Optional[str] = ""
    gpa: Optional[str] = ""
    description: Optional[str] = ""


class SkillGroup(BaseModel):
    id: Optional[str] = None
    category: str
    items: List[str] = []


class ProjectItem(BaseModel):
    id: Optional[str] = None
    name: str
    description: str
    technologies: List[str] = []
    url: Optional[str] = ""
    github: Optional[str] = ""


class CertificationItem(BaseModel):
    id: Optional[str] = None
    name: str
    issuer: str
    date: Optional[str] = ""
    url: Optional[str] = ""


class ResumeCreate(BaseModel):
    title: str = "My Resume"
    template_id: str = "midnight_pro"


class ResumeUpdate(BaseModel):
    title: Optional[str] = None
    template_id: Optional[str] = None
    is_public: Optional[bool] = None
    personal_info: Optional[dict] = None
    summary: Optional[str] = None
    experience: Optional[list] = None
    education: Optional[list] = None
    skills: Optional[list] = None
    projects: Optional[list] = None
    certifications: Optional[list] = None
    languages: Optional[list] = None
    custom_sections: Optional[list] = None


class ResumeResponse(BaseModel):
    id: int
    user_id: int
    title: str
    template_id: str
    is_public: bool
    personal_info: Optional[dict] = {}
    summary: Optional[str] = None
    experience: Optional[list] = []
    education: Optional[list] = []
    skills: Optional[list] = []
    projects: Optional[list] = []
    certifications: Optional[list] = []
    languages: Optional[list] = []
    custom_sections: Optional[list] = []
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# --- Routes ---
@router.get("/", response_model=List[ResumeResponse])
async def list_resumes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Resume).filter(Resume.user_id == current_user.id).all()


@router.post("/", response_model=ResumeResponse, status_code=201)
async def create_resume(
    data: ResumeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    resume = Resume(
        user_id=current_user.id,
        title=data.title,
        template_id=data.template_id,
        personal_info={
            "full_name": current_user.full_name or "",
            "email": current_user.email,
        }
    )
    db.add(resume)
    db.commit()
    db.refresh(resume)
    return resume


@router.get("/{resume_id}", response_model=ResumeResponse)
async def get_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    return resume


@router.put("/{resume_id}", response_model=ResumeResponse)
async def update_resume(
    resume_id: int,
    data: ResumeUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    update_data = data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(resume, key, value)

    db.commit()
    db.refresh(resume)
    return resume


@router.delete("/{resume_id}", status_code=204)
async def delete_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    db.delete(resume)
    db.commit()


@router.post("/{resume_id}/duplicate", response_model=ResumeResponse)
async def duplicate_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    original = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id
    ).first()

    if not original:
        raise HTTPException(status_code=404, detail="Resume not found")

    new_resume = Resume(
        user_id=current_user.id,
        title=f"{original.title} (Copy)",
        template_id=original.template_id,
        personal_info=original.personal_info,
        summary=original.summary,
        experience=original.experience,
        education=original.education,
        skills=original.skills,
        projects=original.projects,
        certifications=original.certifications,
        languages=original.languages,
        custom_sections=original.custom_sections,
    )
    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)
    return new_resume
