import { ActionButton } from "../components/ActionButton";
import FooterIcons from "../components/FooterIcons";
import Logo from "../components/Logo";

export function Home() {
  return (
    <>
      <main className="animate-fade-in gap-24 px-12">
        <Logo />

        <div className="flex flex-col gap-12">
          <h1 className="main__title uppercase">
            ¡Desafía tus <br />
            conocimientos!
          </h1>
          <p className="main__subtitle">
            Descubre el lado divertido de la Limpieza, Sanitización y
            Desinfección{" "}
          </p>
        </div>

        <div className="flex w-full flex-col gap-12">
          <ActionButton
            url="/form/player"
            text="Empezar"
            className=""
          />
          <ActionButton url="/dashboard" text="panel de administrador" className="btn-alternate"/>
        </div>

        <FooterIcons clickable />
      </main>
    </>
  );
}
