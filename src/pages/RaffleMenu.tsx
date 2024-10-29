import { ActionButton } from "../components/ActionButton";
import FooterIcons from "../components/FooterIcons";
import Logo from "../components/Logo";
import { MainTitle } from "../components/MainTitle";

export function RaffleMenu() {
  return (
    <main className="animate-fade-in gap-6 sm:gap-8 px-2 sm:px-6">
      <Logo />

      <MainTitle text="Lista de sorteos" uppercase />

      <div className="flex flex-col gap-4 sm:gap-6">
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
