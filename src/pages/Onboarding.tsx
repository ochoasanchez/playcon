import { ActionButton } from "../components/ActionButton";
// import FooterIcons from "../components/FooterIcons";
// import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import Science from "../assets/images/science.svg";
// import { MainSubtitle } from "../components/MainSubitle";
// import { MainTitle } from "../components/MainTitle";
// import Logo from "../components/Logo";
import logo from "../assets/images/megalabs.svg";

export function Onboarding() {
  return (
    <>
      <main className="px-8 py-12 bg-zinc-50 justify-between">

        <Link to="/" className="flex w-full justify-center mt-8">
          <img src={logo} className="w-7/12" />
        </Link>

        <div className="flex flex-col gap-6 mt-16">
          <h1 className={`text-emerald-700 font-bold playfair-display-400 text-5xl sm:text-7xl text-center`}>
            {/* Desafía <br /><span className="text-5xl sm:text-8xl">tu mente</span> */}
            Pon a prueba <br />tus conocimientos
          </h1>
          {/* <h2 className="text-zinc-600 text-center text-4xl sm:text-4xl ">Descubre el lado divertido de <br/>los medicamentos y el cuidado personal</h2> */}
          <h2 className="text-zinc-600 font-normal text-center text-4xl sm:text-5xl">Juega, aprende y gana <br />con nuestros productos</h2>
          <ActionButton
            url="/form/player"
            text="Empezar"
            className="bg-emerald-500:im mt-8 self-center animate-bounce"
            // fullWidth={false}
          />
               {/* <img src={Science} className="w-6/12 self-end"/> */}
        </div>

        {/* <div className="flex w-full flex-col gap-4"> */}
          {/* <ActionButton
            url="/form/player"
            text="Empezar"
            className="bg-emerald-500:im"
          /> */}
          {/* <Link to="/form/player" className="bg-orange-500 rounded-full font-bold uppercase text-2xl sm:text-4xl text-center w-full flex items-center justify-center">
            Empezar
          </Link> */}
          {/* <ActionButton url="/form" text="Solo registrarme" />
          <ActionButton url="/dashboard" text="panel de administrador" className="btn-alternate"/> */}
        {/* </div> */}
        
        <img src={Science} className="w-6/12 self-end"/>

      </main>
    </>
  );
}
