from fastapi import APIRouter
from services.openai_service import analyze_job_description
from fastapi import Body

router = APIRouter(prefix="/analyzer", tags=["Analyzer"])

@router.post("/")
def analyze(job_text: str = Body(..., embed=False)):
    return analyze_job_description(job_text)