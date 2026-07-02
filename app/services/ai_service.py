import httpx
import json
import os
from typing import List, Optional
from app.core.config import settings


class AIService:
    """Free AI service using Groq (llama3-70b model)."""

    
    BASE_URL = "https://api.groq.com/openai/v1/chat/completions"
    MODEL = "llama-3.3-70b-versatile"

    def _get_api_key(self):
      key = os.environ.get("GROQ_API_KEY") or settings.GROQ_API_KEY

      print("\n========== API KEY CHECK ==========")
      print("Key found:", bool(key))
      if key:
        print("Starts with:", key[:10])
      print("===================================\n")

      return key

    async def _call_groq(self, system_prompt: str, user_prompt: str, max_tokens: int = 500) -> str:
        api_key = self._get_api_key()
        if not api_key:
            return self._fallback_response(user_prompt)

        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }

        body = {
            "model": self.MODEL,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            "max_tokens": max_tokens,
            "temperature": 0.7
        }

        try:
           async with httpx.AsyncClient(timeout=30.0) as client:
             response = await client.post(
             self.BASE_URL,
             headers=headers,
             json=body
        )

             print("\n========== REQUEST BODY ==========")
             print(json.dumps(body, indent=2))
             print("==================================\n")

             print("\n========== RESPONSE ==========")
             print("Status:", response.status_code)
             print("Body:", response.text)
             print("================================\n")

             response.raise_for_status()

             data = response.json()
             return data["choices"][0]["message"]["content"].strip()
        except Exception as e:
           print("\n========== GROQ ERROR ==========")
           print(type(e).__name__)
           print(str(e))
           print("================================\n")
           return self._fallback_response(user_prompt)
    def _fallback_response(self, context: str) -> str:
        return "AI service is currently unavailable. Please add your Groq API key in settings."

    async def enhance_bullet(self, bullet: str, job_title: str = "", company: str = "") -> str:
        system = (
            "You are a professional resume writer. Transform bullet points into "
            "powerful achievement statements using action verbs and quantifiable metrics. "
            "Return only the enhanced bullet point, nothing else."
        )
        user = f"Enhance this resume bullet point for a {job_title} role:\n\n{bullet}"
        return await self._call_groq(system, user, max_tokens=150)

    async def generate_summary(
        self,
        job_title: str,
        years_experience: int,
        skills: List[str],
        tone: str = "professional"
    ) -> str:
        system = (
            "You are a professional resume writer. Write concise, impactful professional "
            "summaries. Return only the summary paragraph, 3-4 sentences max."
        )
        skills_str = ", ".join(skills[:8]) if skills else "various technical skills"
        user = (
            f"Write a {tone} resume summary for a {job_title} with {years_experience} years "
            f"of experience. Key skills: {skills_str}."
        )
        return await self._call_groq(system, user, max_tokens=200)

    async def extract_skills(self, job_description: str) -> List[str]:
        system = (
            "You are an ATS expert. Extract key technical and soft skills from job descriptions. "
            "Return a JSON array of skills strings only, no explanation. Example: [\"Python\", \"React\"]"
        )
        user = f"Extract key skills from this job description:\n\n{job_description[:2000]}"
        result = await self._call_groq(system, user, max_tokens=300)

        try:
            # Try to parse JSON array
            start = result.find("[")
            end = result.rfind("]") + 1
            if start >= 0 and end > start:
                return json.loads(result[start:end])
        except Exception:
            pass

        # Fallback: split by comma
        return [s.strip().strip('"') for s in result.split(",") if s.strip()]

    async def analyze_ats(self, resume_text: str, job_description: str) -> dict:
        system = (
            "You are an ATS (Applicant Tracking System) expert. Analyze resumes against "
            "job descriptions. Return JSON with: score (0-100), missing_keywords (array), "
            "suggestions (array of strings), strengths (array of strings)."
        )
        user = (
            f"Analyze this resume against the job description.\n\n"
            f"RESUME:\n{resume_text[:1500]}\n\n"
            f"JOB DESCRIPTION:\n{job_description[:1500]}"
        )
        result = await self._call_groq(system, user, max_tokens=600)

        try:
            start = result.find("{")
            end = result.rfind("}") + 1
            if start >= 0 and end > start:
                return json.loads(result[start:end])
        except Exception:
            pass

        return {
            "score": 0,
            "missing_keywords": [],
            "suggestions": ["AI analysis unavailable. Please check your Groq API key."],
            "strengths": []
        }