from fastapi import FastAPI, Depends
from routes import analyzer_routes
from openai import OpenAI
from config.settings import OPENAI_API_KEY
from database import get_db
from sqlalchemy.orm import Session


app = FastAPI(title="Tech Skill Gap Analyzer")
client = OpenAI(api_key=OPENAI_API_KEY)

app.include_router(analyzer_routes.router)

@app.get("/")
def root():
    return {"message": "Tech Skill Gap Analyzer API está rodando!🚀"}

@app.get("/users/getAll")
def get_all_users (db: Session = Depends(get_db)):
    result = db.execute('select * from users').fetchall()
    return [dict(r._mapping) for r in result]