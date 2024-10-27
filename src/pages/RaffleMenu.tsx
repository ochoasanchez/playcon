import { ActionButton } from "../components/ActionButton";
import FooterIcons from "../components/FooterIcons";
import Logo from "../components/Logo";
import { MainTitle } from "../components/MainTitle";

export function RaffleMenu() {
  return (
    <main className="animate-fade-in gap-6 lg:gap-24 px-2 lg:px-12">
      <Logo />

      <MainTitle text="Lista de sorteos" uppercase />

      <div className="flex flex-col gap-4 lg:gap-12">
        <ActionButton url="/sorteo/trivia" text="Sorteo Desafio Mental" />
        <ActionButton url="/sorteo/memory" text="Sorteo juego de memoria" />
        <ActionButton url="/sorteo/main" text="Gran Sorteo" />
        <ActionButton
          url="/"
          text="Volver al inicio"
          className="btn-alternate"
        />
      </div>

      <FooterIcons />
    </main>
  );
}
