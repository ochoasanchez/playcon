import { ActionButton } from "../components/ActionButton";
import escudoFeliz from "../assets/images/escudo-feliz.gif";

export function Participate() {

        return (
                   
            <main className="px-12 animate-slide-in-1 gap-4 lg:gap-12">
                <img src={escudoFeliz} className="w-6/12" alt="Result" />
                <p className="main__title mt-4 font-bold">¡Gracias por registrarte!</p>
                <ActionButton url="/" text="Volver al inicio" className="mt-8 w-6/12"/>
            </main>
        )
}