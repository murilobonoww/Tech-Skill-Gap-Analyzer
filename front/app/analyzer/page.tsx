"use client";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

export default function Login() {

    const [desc, setDesc] = useState("")


    const SendDescription = async () => {
        try {
            const res = await axios.post('http://127.0.0.1:8000/analyzer/', desc)
            console.log(res)
        } catch (error) {
            console.log("Erro ao postar descrição: ", error)
        }
    }

    return (
        <div>
                <nav className=" w-screen flex shadow bg-white items-center absolute">
                    <h1 className="ml-7 text-xl">SkillGap</h1>
                    <ul className="flex justify-end gap-6 pt-6 pb-6 w-screen">
                        <li className="li_navbar_home">Home</li>
                        <li className="li_navbar_home text-amber-500">Analizador</li>
                        <li className="li_navbar_home">Meu perfil</li>
                        <li className="li_navbar_home">Análises</li>
                        <li className="li_navbar_home mr-10">
                            <Link href="/">Sair</Link>
                        </li>
                    </ul>
                </nav>
                <main className="flex w-screen h-screen">
                    <div className="leftcolumn bg-gray-200 w-1/2"></div>
                    <div className="rightcolumn bg-gray-100 w-1/2 pt-21">
                        <div className="rightcolumn_content flex flex-col items-start ml-20">
                            <form onSubmit={SendDescription}>
                                <div className="bg-white border border-slate-200 grid grid-cols-6 gap-2 rounded-xl p-2 text-sm w-150">
                                    <h1 className="text-center text-slate-400 text-xl font-bold col-span-6">Descrição da vaga</h1>
                                    <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Cole a descrição da vaga aqui..." className="bg-slate-100 text-slate-600 h-140 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600"></textarea>
                                    <span className="col-span-3"></span>

                                    <button type="submit" className="bg-slate-100 stroke-slate-600 border border-slate-200 col-start-6 flex justify-center rounded-lg p-2 duration-300 hover:border-slate-600 hover:bg-amber-500 hover:stroke-white hover:text-white focus:stroke-white focus:bg-amber-500 w-20">
                                        <svg fill="none" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"></path>
                                            <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M10.11 13.6501L13.69 10.0601"></path>
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
        </div>
    );
}