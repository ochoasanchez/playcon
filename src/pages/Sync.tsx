import { ActionButton } from "../components/ActionButton";
import FooterIcons from "../components/FooterIcons";
import Logo from "../components/Logo";
import { MainSubtitle } from "../components/MainSubitle";
import { MainTitle } from "../components/MainTitle";
import { updateUsers } from "../helpers/game.helper";


export function Sync() {

    // const syncData = () => {
    //     console.log(JSON.parse(localStorage.getItem('users') || '[]'))
    // }

    
  return (
    <main className="animate-fade-in gap-24 px-12">
  
      <Logo />

      <MainTitle text="Respaldo de datos" uppercase/>
      <MainSubtitle text="Presiona el botón para enviar los datos a Strapi" />

      <div className="flex flex-col gap-12">
      <ActionButton url="/sync" text="Sincronizar datos" onClick={updateUsers}/>
      {/* <ActionButton url="/sorteo/trivia" text="Lista de usuarios" />
      <ActionButton url="/sorteo/trivia" text="Datos de uso" /> */}
      </div>

      <FooterIcons />
    </main>
  );
}
