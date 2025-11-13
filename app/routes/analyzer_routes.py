from fastapi import APIRouter
from services.openai_service import analyze_job_description
from services.openai_service import compare_requirements
from fastapi import Body
from pydantic import BaseModel

router = APIRouter(prefix="/skillgap", tags=["Analyzer"])

@router.post("/analyze/job_description")
def analyze(job_text: str = Body(..., embed=False)):
    return analyze_job_description(job_text)


class AnalyzeRequest(BaseModel):
    job_text: str
    profile: str
@router.post("/analyze/compare_requirements")
def analyze(req: AnalyzeRequest):
    return compare_requirements(req.job_text, req.profile)