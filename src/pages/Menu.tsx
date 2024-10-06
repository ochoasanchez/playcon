// import icons from "../assets/images/icons.png";
import { ActionButton } from "../components/ActionButton";
import FooterIcons from "../components/FooterIcons";
import Logo from "../components/Logo";

// TODO: Video or image background

export function Menu() {
  const user = localStorage.currentUser ? JSON.parse(localStorage.currentUser) : "";
  const userName = localStorage.currentUser
    ? user.name.replace(/ .*/, "")
    : "";

  return (
    <main className="animate-fade-in gap-24 px-12">
      <Logo />

      <h1 className="main__title uppercase">
        ¡Es hora de la verdad{user !== "" ? `, ${userName}` : ""}!
      </h1>
      <p className="main__subtitle uppercase">¿A qué quieres enfrentarte?</p>

      <div className="flex w-full flex-col gap-12">
        <ActionButton url="/trivia" text="Desafío mental" />
        <ActionButton url="/memory" text="Mikia memory challenge" />
        <ActionButton
          url="/"
          text="Volver al Inicio"
          className="btn-alternate"
        />
      </div>

      <FooterIcons clickable />
    </main>
  );
}
