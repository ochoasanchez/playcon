// import logo from "../assets/images/logo-blanco.png";
import icons from "../assets/images/icons.png";
import Nav from "../components/Nav";
import { ActionButton } from "../components/ActionButton";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

export function Home() {
    
    return (
        <main className="px-12 animate-fade-in gap-16">
            <Logo />
    
            <h1 className="main__title uppercase">¡Desafía tus <br />conocimientos!</h1>
            <p className="main__subtitle">Descubre el lado divertido de la Limpieza, Santiziación y Desinfección </p>

            <ActionButton url="/form/player" text="Registrarme y jugar" className="" />
            <ActionButton url="/form" text="Solo registrarme" />
            <Link to="/sorteo">
                <img src={icons} className="mt-16"/>
            </Link>
        </main>
    )
}