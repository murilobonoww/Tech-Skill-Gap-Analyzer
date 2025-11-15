from openai import OpenAI
from config.settings import OPENAI_API_KEY
import logging

client = OpenAI(api_key=OPENAI_API_KEY)

def analyze_job_description(job_text: str):
    prompt = f"""
    Analise a seguinte descrição de vaga e retorne um JSON com:
    - linguagens_de_programacao
    - frameworks_e_bibliotecas
    - bancos_de_dados
    - metodologias_de_trabalho (string [], SE A VAGA NÃO INFORMAR NENHUMA, COLOQUE "Não informado.")
    - arquiteturas_e_paradigmas (string [], SE A VAGA NÃO INFORMAR NENHUMA, COLOQUE "Não informado.")
    - devops_e_infraestrutura (string [], SE A VAGA NÃO INFORMAR NENHUMA, COLOQUE "Não informado.")
    - cloud_computing (string [], SE A VAGA NÃO INFORMAR NENHUMA, COLOQUE "Não informado.")
    - deploy_e_build_tools (string [], SE A VAGA NÃO INFORMAR NENHUMA, COLOQUE "Não informado.")
    - ferramentas_e_tecnologias_front-end (string [], SE A VAGA NÃO INFORMAR NENHUMA, COLOQUE "Não informado.")
    - ferramentas_e_tecnologias_back-end (string [], SE A VAGA NÃO INFORMAR NENHUMA, COLOQUE "Não informado.")
    - roadmap_aprendizado_resumido
    
    rules: 
    1- CADA item é ESSENCIAL, VERIFIQUE SE ESTÃO TODOS NO JSON: linguagens_de_programacao, frameworks_e_bibliotecas, banco_de_dados, 
    metodologias_de_trabalho, arquiteturas_e_paradigmas, devops_e_infraestrutura, roadmap_aprendizado_resumido, cloud_computing, deploy_e_build_tools, 
    ferramentas_e_tecnologias_front-end, ferramentas_e_tecnologias_back-end
    TEXTO DA VAGA:
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
    - matchs_list (string [], lista com os itens que corresponderam)
    - not_matchs_list (string [], lista com os itens que não tenho, portanto não corresponderam)
    - roadmap_personalizado (string [], crie um roadmap personalizado dados os itens que faltaram no meu perfil, e organize os aprendizados na melhor ordem possível pra facilitar aprendizado. Separe por fases, ex: Fase 1, Fase 2, e não especifique o tempo)
    se você encontrar em comum alguma palavra chave, por exemplo: meu perfil tem 'NodeJS' e a vaga exige 'NodeJS/NestJS', marque apenas 'NodeJS' como sendo uma correspondencia e deixe apenas o NestJS como faltando
    qualquer item que não estiver no perfil do usuário deve ser listado na not_matchs_list, até mesmo as coisas mais simples, como Git, CI/CD, testes unitários, etc.
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