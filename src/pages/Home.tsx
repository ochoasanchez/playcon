import { ActionButton } from "../components/ActionButton";
import FooterIcons from "../components/FooterIcons";
import Logo from "../components/Logo";

export function Home() {
    
    return (
        <>
            <main className="animate-fade-in gap-8">
                <Logo />

                {/*
                <div className="flex flex-col gap-4">
                    <h1 className="main__title uppercase">¡Desafía tus conocimientos!</h1>
                    <p className="main__subtitle">Descubre el lado divertido de la Limpieza, Sanitización y Desinfección </p>
                </div>

                 <div className="w-full flex flex-col gap-4"> */}
                    <p className="main__subtitle">Descubre el lado divertido de la Limpieza,<br /> Sanitización y Desinfección </p>
                <div className="w-full flex gap-4">
                    {/* <ActionButton url="/form/player" text="Registrarme y jugar" className="" /> */}
                    <ActionButton url="/form" text="Registrarme" className="w-max mx-auto"/>
                </div>
                
                <FooterIcons clickable/>
            </main>
        </>
    )
}