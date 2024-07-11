import { ActionButton } from "../components/ActionButton";
import FooterIcons from "../components/FooterIcons";
import Logo from "../components/Logo";

export function Home() {
    
    return (
        <>
            <main className="px-12 animate-fade-in gap-24">
                <Logo />

                <div className="flex flex-col gap-12">
                    <h1 className="main__title uppercase">¡Desafía tus <br />conocimientos!</h1>
                    <p className="main__subtitle">Descubre el lado divertido de la Limpieza, Sanitización y Desinfección </p>
                </div>

                <div className="w-full flex flex-col gap-12">
                    <ActionButton url="/form/player" text="Registrarme y jugar" className="" />
                    <ActionButton url="/form" text="Solo registrarme" />
                </div>
                
                <FooterIcons clickable/>
            </main>
        </>
    )
}