import { ActionButton } from "../components/ActionButton";
import FooterIcons from "../components/FooterIcons";
import Logo from "../components/Logo";

export function RaffleMenu() {
  return (
    <main className="animate-fade-in gap-24 px-12">
      <Logo />

      <h1 className="main__title w-full font-bold uppercase">
        Lista de sorteos
      </h1>

      <div className="flex flex-col gap-12">
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
