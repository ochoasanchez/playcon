// import icons from "../assets/images/icons.png";
import { ActionButton } from "../components/ActionButton";
// import FooterIcons from "../components/FooterIcons";
import Logo from "../components/Logo";
import { MainSubtitle } from "../components/MainSubitle";
// import { MainTitle } from "../components/MainTitle";

// TODO: Video or image background

export function Menu() {
  const user = localStorage.currentUser ? JSON.parse(localStorage.currentUser) : "";
  const userName = localStorage.currentUser
    ? user.name.replace(/ .*/, "")
    : "";

  const title = <>¡Es la hora de<br /> la verdad{user !== "" ? `, ${userName}` : ""}!</>;  
  
  return (
    <main className="gap-12 px-4 sm:px-12">
      <Logo size="large"/>

      <h1 className={`text-center font-bold playfair-display-400 text-5xl sm:text-6xl`}>
        {title}
      </h1>
      <MainSubtitle text="¿A qué quieres enfrentarte?"/>

      <div className="flex w-full flex-col gap-8">
        <ActionButton url="/trivia" text="Juego de trivia" />
        <ActionButton url="/memory" text="Juego de memoria" />
        <ActionButton url="/wheel" text="Ruleta" />
        <ActionButton
          url="/"
          text="Volver al Inicio"
          variant="alternate"
        />
      </div>
    </main>
  );
}