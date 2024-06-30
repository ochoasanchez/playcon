// import logo from "../assets/images/logo-blanco.png";
import icons from "../assets/images/icons.png";
import Nav from "../components/Nav";
import { ActionButton } from "../components/ActionButton";
import Logo from "../components/Logo";

export function Home() {
    
    return (
        <main className="px-12 animate-fade-in">
            {/* <img src={logo} className="w-68"/> */}
            <Logo />

            {/* <div className="flex flex-col w-full md:w-8/12 lg:w-8/12 text-center py-6"> */}
    
            <h1 className="main__title uppercase">¡Desafía tus <br />conocimientos!</h1>
            <p className="main__subtitle">Descubre el lado divertido de la Limpieza, Santiziación y Desinfección </p>
            {/* </div> */}

            {/* <div className="flex flex-col w-full md:w-8/12 lg:w-8/12 mt-4 text-center"> */}
            <ActionButton url="/form/player" text="Registrarme y jugar" className="" />
            <ActionButton url="/form" text="Solo registrarme" />
            <img src={icons} className="justify-self-end"/>
            <Nav />
            {/* </div> */}
        </main>
    )
}