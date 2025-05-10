import { useState } from "react";
import { ActionButton } from "../components/ActionButton";
import Logo from "../components/Logo";
import { MainTitle } from "../components/MainTitle";

export function Dashboard() {
  
  const [showModal, setShowModal] = useState(false);


  const deleteData = () => {
    localStorage.clear();
    setShowModal(false);
  }

  const handleGoBack = () => {
    setShowModal(false);
  };
  
  return (
    <main className="gap-4 sm:gap-16 px-8">
  
      <Logo size="large"/>

      <MainTitle text="Configuración" size="large"/>

      <div className="flex flex-col gap-4 w-full">
      <ActionButton url="/sync" text="Respaldar datos" />
      <ActionButton url="/users" text="Lista de usuarios" />
      <ActionButton url="/sorteo/main" text="Sorteo" />
      <ActionButton url="/" text="Volver" variant="alternate"/>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="flex w-10/12 flex-col gap-4 sm:gap-6 rounded-md bg-white px-2 sm:px-6 py-4 sm:py-16">
            <p className="text-center text-2xl sm:text-4xl text-black">
              ¿Confirmas que deseas borrar
              <br /> todos los datos de la app?
            </p>
            <div className="flex justify-around gap-4 sm:gap-12 px-4 sm:px-12">
              <ActionButton
                onClick={handleGoBack}
                text="Volver"
                size="small"
                className="btn-alternate border-4 border-orange-500"
              />
              <ActionButton onClick={deleteData} text="Enviar" size="small" />
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
