from openai import OpenAI
from config.settings import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

def analyze_job_description(job_text: str):
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

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"},
    )

    return response.choices[0].message.content