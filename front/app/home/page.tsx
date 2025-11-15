import "../globals.css"
import Link from "next/link"


export default function Home() {
  return (
    <div className=" w-screen h-screen">
      <nav className=" w-screen flex shadow bg-white items-center">
        <h1 className="ml-7 text-3xl">SkillGap</h1>
        <ul className="flex justify-end gap-6 pt-6 pb-6 w-screen">

          <li className="li_navbar_home text-amber-500">Home</li>
          <Link href="/analyzer"><li className="li_navbar_home">Analizador</li></Link>
          <li className="li_navbar_home">Meu perfil</li>
          <li className="li_navbar_home">Análises</li>
          <li className="li_navbar_home mr-10">
            <Link href="/">Sair</Link>
          </li>
        </ul>
      </nav>
      <main className="flex flex-col items-center mt-15">
        <h1 className="font-bold text-6xl">Bem-vindo ao SkillGap</h1>
        <p className="text-xl w-210 text-center mt-5">Teste a nossa ferramenta, descubra vagas que você se encaixa, preencha as lacunas nas suas habilidades técnicas e impulsione sua carreira 🚀</p>
        <Link href="/analyzer"><button className="bg-amber-500 text-white p-4 pl-8 pr-8 rounded-xl mt-5 shadow-xl cursor-pointer">
          Começar
        </button>
        </Link>

        <div className="flex gap-20 mt-20">
          <div className="bg-gray-100 w-105 h-70 rounded-2xl shadow-md flex flex-col items-center justify-center text-center hover:-translate-y-1 hover: transition-all duration-400 select-none hover:shadow-lg text-gray-400"><span className="text-3xl text-black">Economize tempo</span> Transforme descrições extensas em resumos objetivos<span className="text-8xl mt-5">⏱️</span></div>
          <div className="bg-gray-100 w-105 h-70 rounded-2xl shadow-md flex flex-col items-center justify-center text-center hover:-translate-y-1 hover: transition-all duration-400 select-none hover:shadow-lg text-gray-400"><span className="text-3xl text-black">Compare com seu perfil</span>Veja exatamente quais skills você já tem e quais faltam. Descubra sua porcentagem de compatibilidade com qualquer vaga <span className="text-7xl mt-5">📊</span></div>
          <div className="bg-gray-100 w-105 h-70 rounded-2xl shadow-md flex flex-col items-center justify-center text-center hover:-translate-y-1 hover: transition-all duration-400 select-none hover:shadow-lg text-gray-400"><span className="text-3xl text-black">Roadmap de melhoria</span>Receba um plano com o que aprender para se tornar o candidato ideal <span className="text-8xl mt-5">🎯</span></div>
        </div>
      </main>
    </div>
  );
}