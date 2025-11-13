"use client";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { stringify } from "querystring";
import Image from "next/image";

export default function Login() {

    const [desc, setDesc] = useState("")
    const [resume_response, setResume_response] = useState<Resume_response>()
    const [comparison_response, setComparison_response] = useState<ComparisonResponse>()
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [loading, setLoading] = useState(false)
    const [porcentagem, setPorcentagem] = useState(0)

    useEffect(() => {
        if (!loading && comparison_response) {
            const correspondencia = comparison_response.correspondencia
            const numeros = correspondencia.match(/\d+/g);
            const num_skills_correspondentes = Number(numeros![0])
            const num_skills_totais = Number(numeros![1])
            const porcentagem_ = Number(((num_skills_correspondentes / num_skills_totais) * 100).toFixed(2))
            setPorcentagem(porcentagem_)
        }
    }, [loading, comparison_response])

    const getColor = () => {
        if(porcentagem <= 50) return "text-red-400"
        if(porcentagem <= 70) return "text-yellow-200"
        else return "text-green-300"
    }


    useEffect(() => {
        if (loading1 && loading2) {
            setLoading(true)
        }
        else {
            setLoading(false)
        }
    }, [loading1, loading2])

    type Resume_response = {
        "linguagens_de_programacao_mais_citadas": string[],
        "frameworks_e_bibliotecas_mencionadas": string[],
        "banco_de_dados": string[],
        "skills_recomendadas": string[],
        "roadmap_aprendizado_resumido": RoadMapItem[]
    }

    type RoadMapItem = {
        "fase": string,
        "descricao": string
    }

    type ComparisonResponse = {
        "correspondencia": string,
        "matchs_list": string[],
        "not_matchs_list": string[],
        "roadmap_personalizado": string[]
    }

    const SendDescription = async () => {
        try {
            setLoading1(true)
            const res = await axios.post('http://127.0.0.1:8000/skillgap/analyze/job_description', desc)
            const data = JSON.parse(res.data)
            setLoading1(false)
            setResume_response(data)
        } catch (error) {
            console.log("Erro ao postar descrição: ", error)
        }
    }

    const CompareRequirements = async () => {
        try {
            setLoading2(true)
            const res = await axios.post('http://127.0.0.1:8000/skillgap/analyze/compare_requirements', { job_text: desc, profile: "Meu nome é Murilo, tenho 2 anos de experiencia em react, node, html, css, typescript, python, javascript." })
            const data = JSON.parse(res.data)
            setLoading2(false)
            setComparison_response(data)
            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <nav className=" w-screen flex shadow bg-white items-center absolute">
                <h1 className="ml-7 text-3xl">SkillGap</h1>
                <ul className="flex justify-end gap-6 pt-6 pb-6 w-screen">

                    <Link href="/home"><li className="li_navbar_home">Home</li></Link>
                    <li className="li_navbar_home text-amber-500">Analizador</li>
                    <li className="li_navbar_home">Meu perfil</li>
                    <li className="li_navbar_home">Análises</li>

                    <Link href="/"><li className="li_navbar_home mr-10">Sair</li></Link>
                </ul>
            </nav>
            <main className="flex w-screen h-screen">
                <div className="leftcolumn bg-gray-100 w-1/2 flex flex-col overflow-auto h-screen">
                    {loading &&
                        <div className="loader">
                            <div className="ball"></div>
                            <div className="ball"></div>
                            <div className="ball"></div>
                        </div>
                    }

                    {!loading && (
                        <div className="ml-12 mt-25  max-w-170 bg-white p-10 rounded-2xl shadow">
                            <h1 className="text-3xl text-black mb-1">Resumo da vaga</h1>
                            <div className="text-slate-400"><div id="topic">Linguagens de programação:</div> {resume_response && !loading ? resume_response.linguagens_de_programacao_mais_citadas.map((lang, l) => (
                                <li key={l}>{lang}</li>
                            )) : "-"}</div>

                            <div className="text-slate-400"><div id="topic">Frameworks e bibliotecas:</div> {resume_response && !loading ? resume_response.frameworks_e_bibliotecas_mencionadas.map((item, i) => (
                                <li key={i}>{item}</li>
                            )) : "-"}</div>


                            <div className="text-slate-400"><div id="topic">Bancos de dados:</div> {resume_response && !loading ? resume_response.banco_de_dados.map((item, i) => (
                                <li key={i}>{item}</li>
                            )) : "-"}</div>
                            <div className="text-slate-400"><div id="topic">Skills recomendadas:</div>{resume_response && !loading ? resume_response.skills_recomendadas.map((skill, s) => (
                                <li key={s}>{skill}</li>
                            )) : "-"}</div>
                        </div>
                    )}

                    {!loading && (
                        <div className="ml-12 mt-10 max-w-170 bg-white p-10 rounded-2xl shadow mb-5">
                            <h1 className="text-3xl text-black mb-1">Análise</h1>
                            {comparison_response && !loading && <div className={getColor()}>{porcentagem}%</div>}

                            <div className={getColor()}> {comparison_response && !loading ? <div className="">{comparison_response.correspondencia}</div> : "-"}</div>

                            <div className="text-slate-400"><div id="topic">Skills correspondidas:</div> {comparison_response && !loading ? comparison_response.matchs_list.map((item, i) => (
                                <li key={i}>{item}</li>
                            )) : "-"}</div>


                            <div className="text-slate-400"><div id="topic">Skills faltando:</div> {comparison_response && !loading ? comparison_response.not_matchs_list.map((item, i) => (
                                <li key={i}>{item}</li>
                            )) : "-"}</div>
                            <div className="text-slate-400"><div id="topic">Roadmap personalizado:</div> {comparison_response && !loading ? comparison_response.roadmap_personalizado.map((item, i) => (
                                <li key={i}>{item}</li>
                            )) : "-"}</div>
                        </div>
                    )}

                </div>

                <div className="rightcolumn bg-gray-100 w-1/2 pt-21 border-l-2 border-zinc-200">
                    <div className="rightcolumn_content flex flex-col items-start ml-20">
                        <div className="bg-white border border-slate-200 grid grid-cols-6 gap-2 rounded-xl p-2 text-sm w-150">
                            <h1 className="text-center text-slate-400 text-xl font-bold col-span-6">Descrição da vaga</h1>
                            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Cole a descrição da vaga aqui..." className="bg-slate-100 text-slate-600 h-140 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600"></textarea>
                            <span className="col-span-3"></span>

                            <button onClick={() => {
                                SendDescription()
                                CompareRequirements()
                            }} className="bg-slate-100 stroke-slate-600 border border-slate-200 col-start-6 flex justify-center rounded-lg p-2 duration-300 hover:border-slate-600 hover:bg-amber-500 hover:stroke-white hover:text-white focus:stroke-white focus:bg-amber-500 w-20">
                                <svg fill="none" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"></path>
                                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M10.11 13.6501L13.69 10.0601"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}