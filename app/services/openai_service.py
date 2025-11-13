from openai import OpenAI
from config.settings import OPENAI_API_KEY
import logging

client = OpenAI(api_key=OPENAI_API_KEY)

def analyze_job_description(job_text: str):
    print("executando funcao...")
    prompt = f"""
    Analise a seguinte descrição de vaga e retorne um JSON com:
    - linguagens de programação mais citadas
    - frameworks e bibliotecas mencionadas
    - nível de senioridade (junior, pleno, senior)
    - lista de skills recomendadas
    - roadmap de aprendizado (resumido)

    Vaga:
    {job_text}
    """
    try:
        response =  client.chat.completions.create(
            model="gpt-5-nano",
            messages=[{"role": "user", "content": prompt}]
        )
    except Exception as e:
        print(e)
    
    logging.warning(response.choices[0].message.content)

    return response.choices[0].message.content