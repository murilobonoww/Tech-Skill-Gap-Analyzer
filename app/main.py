from fastapi import FastAPI
from routes import analyzer_routes
from openai import OpenAI
from config.settings import OPENAI_API_KEY

app = FastAPI(title="Tech Skill Gap Analyzer")
client = OpenAI(api_key=OPENAI_API_KEY)

app.include_router(analyzer_routes.router)

@app.get("/")
def root():
    return {"message": "Tech Skill Gap Analyzer API está rodando!🚀"}