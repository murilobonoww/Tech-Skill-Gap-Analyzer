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
      <main className="flex flex-col items-center mt-20">
        <h1 className="font-bold text-5xl">Bem-vindo ao SkillGap</h1>
        <p className="text-xl w-210 text-center mt-5">Teste a nossa ferramenta, descubra vagas que você se encaixa, preencha as lacunas nas suas habilidades técnicas e impulsione sua carreira 🚀</p>
        <Link href="/analyzer"><button className="bg-amber-500 text-white p-4 pl-8 pr-8 rounded-xl mt-5 shadow-xl cursor-pointer">
          Começar
          </button>
        </Link>
      </main>
    </div>
  );
}