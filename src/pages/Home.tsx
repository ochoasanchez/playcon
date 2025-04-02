import { ActionButton } from "../components/ActionButton";
// import FooterIcons from "../components/FooterIcons";
import Logo from "../components/Logo";
import { MainSubtitle } from "../components/MainSubitle";
import { MainTitle } from "../components/MainTitle";

export function Home() {
  return (
    <>
      <main className="gap-8 sm:gap-8 px-12">
        <Logo />

        <div className="flex flex-col gap-6">
          <MainTitle text="¡Desafía tus conocimientos!" uppercase/>
          <MainSubtitle text="Descubre el lado divertido de los medicamentos y el cuidado pesonal" />
        </div>

        <div className="flex w-full flex-col gap-4">
          <ActionButton
            url="/form/player"
            text="Registrarme y jugar"
            className=""
          />
          <ActionButton url="/form" text="Solo registrarme" />
          <ActionButton url="/dashboard" text="panel de administrador" className="btn-alternate"/>
        </div>

      </main>
    </>
  );
}
