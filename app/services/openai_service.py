from openai import OpenAI
from config.settings import OPENAI_API_KEY
import logging

client = OpenAI(api_key=OPENAI_API_KEY)

def analyze_job_description(job_text: str):
    prompt = f"""
    Analise a seguinte descrição de vaga e retorne um JSON com:
    - linguagens_de_programacao_mais_citadas
    - frameworks_e_bibliotecas_mencionadas
    - banco_de_dados
    - skills_recomendadas (lista)
    - roadmap_aprendizado_resumido
    
    rules: 
    1- não repita um item, se ele já apareceu, por exemplo em linguagens ou em frameworks e bibliotecas, não repita em skills recomendadas
    {job_text}
    """
    try:
        response =  client.chat.completions.create(
            model="gpt-5-nano",
            messages=[{"role": "user", "content": prompt}]
        )
    except Exception as e:
        print(e)
    
    return response.choices[0].message.content

def compare_requirements(job_text: str, profile: str):
    prompt = f"""
    este é o meu perfil profissional: {profile}. analise o que eu sei e compare com o que esta vaga a seguir pede, e retorne um JSON com:
    - correspondencia (string, ex: "7 de 12 skills necessárias", serve pra medir quantos itens meu perfil tem / de quantos a vaga pede. Cada item técnico que a vaga informar conta)
    - matchs_list (string [], lista com os itens que corresponderam)
    - not_matchs_list (string [], lista com os itens que não tenho portanto não corresponderam)
    - roadmap_personalizado (string [], crie um roadmap personalizado dados os itens que faltaram no meu perfil, e organize os aprendizados na melhor ordem possível pra facilitar aprendizado. Separe por fases, ex: Fase 1, Fase 2, e não especifique o tempo)
    se você encontrar em comum alguma palavra chave, por exemplo: meu perfil tem node e a vaga exige 'NodeJS/NestJS', marque node como sendo uma correspondencia e deixe apenas o Nest como faltando
    {job_text}
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-5-nano",
            messages=[{"role": "user", "content": prompt}]
        )
    except Exception as e:
        print(e)
        
    return response.choices[0].message.content