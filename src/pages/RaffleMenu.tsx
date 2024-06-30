import icons from "../assets/images/icons.png";
import { ActionButton } from "../components/ActionButton";
import Logo from "../components/Logo";

export function RaffleMenu() {

    return (
        <main className="animate-slide-in-1 px-12">
            <Logo />
            
            <h1 className="main__title font-bold uppercase">lista de sorteos</h1>
                
            <ActionButton url="/sorteo/trivia" text="Sorteo Desafio Mental" />
            <ActionButton url="/sorteo/memory" text="Sorteo juego de memoria" />
            <ActionButton url="/sorteo/main" text="Gran Sorteo" />
            <ActionButton url="/" text="Volver al inicio" className="bg-white text-orange-500" />
                
            <img src={icons} className="mt-16"/>
        </main>
    )
}