// import icons from "../assets/images/icons.png";
import { ActionButton } from "../components/ActionButton";
import Clicker from "../components/Clicker";
import Logo from "../components/Logo";
// import { Link } from "react-router-dom";

export function Home() {
    
    return (
        <>
            <main className="px-12 animate-fade-in gap-24">
                <Logo />
                <h1 className="main__title uppercase">¡Desafía tus <br />conocimientos!</h1>
                <p className="main__subtitle">Descubre el lado divertido de la Limpieza, Santiziación y Desinfección </p>

                <div className="w-full flex flex-col gap-12">
                    <ActionButton url="/form/player" text="Registrarme y jugar" className="" />
                    <ActionButton url="/form" text="Solo registrarme" />
                </div>
                {/* <Link to="/sorteo">
                    <img src={icons} className="mt-16"/>
                </Link> */}
                <Clicker />
            </main>
        </>
    )
}