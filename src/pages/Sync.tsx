import { ActionButton } from "../components/ActionButton";
import FooterIcons from "../components/FooterIcons";
import Logo from "../components/Logo";
import { updateUsers } from "../helpers/game.helper";


export function Sync() {

    // const syncData = () => {
    //     console.log(JSON.parse(localStorage.getItem('users') || '[]'))
    // }

    
  return (
    <main className="animate-fade-in gap-24 px-12">
  
      <Logo />

      <h1 className="main__title w-full font-bold uppercase">
        Sync
      </h1>

      <div className="flex flex-col gap-12">
      <ActionButton url="/sync" text="Sincronizar datos" onClick={updateUsers}/>
      {/* <ActionButton url="/sorteo/trivia" text="Lista de usuarios" />
      <ActionButton url="/sorteo/trivia" text="Datos de uso" /> */}
      </div>

      <FooterIcons />
    </main>
  );
}
