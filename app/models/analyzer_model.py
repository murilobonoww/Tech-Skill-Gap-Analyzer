from pydantic import BaseModel

class JobInput(BaseModel):
    description: str