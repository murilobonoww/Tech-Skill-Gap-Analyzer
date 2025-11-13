import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex w-screen h-screen bg-linear-to-r from-gray-800 to-gray-600 overflow-hidden">
      <div className="left_column w-1/2 flex flex-col justify-center items-center">
        {/* <video
          src="/rocket.mp4"
          className="w-[300px] h-[300px] rounded-lg object-cover"
          autoPlay
          loop
          muted
          playsInline
        /> */}

        {/* <Image
          src="/career_.jpg"
          alt=""
          width={300}
          height={300}
        /> */}


        <div className="rocket">
          <div className="rocket-body">
            <div className="body"></div>
            <div className="fin fin-left"></div>
            <div className="fin fin-right"></div>
            <div className="window"></div>
          </div>
          <div className="exhaust-flame"></div>
          <ul className="exhaust-fumes">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <ul className="star">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>


      </div>

      <div className="right_column w-1/2 min-h-screen flex items-center justify-start">

        <div className="right_column_cont flex flex-col items-center">
          <h1 className="text-6xl font-bold text-white">SkillGap</h1>
          <div className="h-20 flex items-center border-b-2 border-b-gray-500 mb-10">
            <p className="text-white">Preencha as lacunas nas suas tech skills e garanta seu sucesso!</p>
          </div>
          <button id="btn_login_signup_start">Registrar-se</button>
          <button id="btn_login_signup_start">Entrar</button>
          <Link href="/home" className="text-white">Entrar como convidado</Link>
        </div>

      </div>
    </div>
  );
}
