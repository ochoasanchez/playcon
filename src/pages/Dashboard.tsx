import { ActionButton } from "../components/ActionButton";
import FooterIcons from "../components/FooterIcons";
import Logo from "../components/Logo";

export function Dashboard() {
  return (
    <main className="animate-fade-in gap-24 px-12">
  
      <Logo />

      <h1 className="main__title w-full font-bold uppercase">
        Panel de Administrador
      </h1>

      <div className="flex flex-col gap-12">
      <ActionButton url="/sync" text="Sincronizar datos" />
      {/* <ActionButton url="/sorteo/trivia" text="Lista de usuarios" />
      <ActionButton url="/sorteo/trivia" text="Datos de uso" /> */}
      </div>

      <FooterIcons />
    </main>
  );
}
