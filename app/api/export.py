from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
import io
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.resume import Resume
from app.services.export_service import ExportService

router = APIRouter(prefix="/api/export", tags=["Export"])
export_service = ExportService()


@router.get("/{resume_id}/docx")
async def export_docx(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Export resume as .docx file."""
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    docx_buffer = export_service.generate_docx(resume)
    filename = f"{resume.title.replace(' ', '_')}.docx"

    return StreamingResponse(
        io.BytesIO(docx_buffer),
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'}
    )


@router.get("/{resume_id}/pdf")
async def export_pdf(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Export resume as PDF."""
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    pdf_buffer = export_service.generate_pdf(resume)
    filename = f"{resume.title.replace(' ', '_')}.pdf"

    return StreamingResponse(
        io.BytesIO(pdf_buffer),
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'}
    )


@router.get("/{resume_id}/json")
async def export_json(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Export resume data as JSON (for backup/import)."""
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    data = {
        "title": resume.title,
        "template_id": resume.template_id,
        "personal_info": resume.personal_info,
        "summary": resume.summary,
        "experience": resume.experience,
        "education": resume.education,
        "skills": resume.skills,
        "projects": resume.projects,
        "certifications": resume.certifications,
        "languages": resume.languages,
        "custom_sections": resume.custom_sections,
    }
    import json
    json_str = json.dumps(data, indent=2)
    filename = f"{resume.title.replace(' ', '_')}.json"

    return StreamingResponse(
        io.StringIO(json_str),
        media_type="application/json",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'}
    )
