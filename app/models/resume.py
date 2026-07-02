from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, JSON, func
from sqlalchemy.orm import relationship
from app.core.database import Base


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    title = Column(String(255), nullable=False, default="My Resume")
    template_id = Column(String(50), nullable=False, default="midnight_pro")
    is_public = Column(Boolean, default=False)

    # Resume data stored as JSON
    personal_info = Column(JSON, default={})
    summary = Column(String(2000), nullable=True)
    experience = Column(JSON, default=[])
    education = Column(JSON, default=[])
    skills = Column(JSON, default=[])
    projects = Column(JSON, default=[])
    certifications = Column(JSON, default=[])
    languages = Column(JSON, default=[])
    custom_sections = Column(JSON, default=[])

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationship
    owner = relationship("User", backref="resumes")
