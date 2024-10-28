import { useState } from "react";
import axios from "axios";
import { ActionButton } from "../components/ActionButton";
import FooterIcons from "../components/FooterIcons";
import Logo from "../components/Logo";
import { MainSubtitle } from "../components/MainSubitle";
import { MainTitle } from "../components/MainTitle";
import { StrapiSettingsModal } from "../components/StrapiSettingsModal";

let initialStrapiUrl = import.meta.env.VITE_STRAPI_URL;
let initialBearerToken = `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`;

export function Sync() {
  const [strapiUrl, setStrapiUrl] = useState(initialStrapiUrl);
  const [bearerToken, setBearerToken] = useState(initialBearerToken);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateUsers = async () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const config = {
      headers: {
        Authorization: bearerToken,
      },
    };

    try {
      let counter = 0;
      for (const user of users) {
        const data = { data: user };
        const response = await axios.post(`${strapiUrl}/api/clients`, data, config);
        console.log("User successfully synced: ", response);
        counter++;
      }
      console.log(`Looped through ${counter} users`);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const updateStrapiHeaders = () => {
    setIsModalOpen(true);
  };

  const handleSaveSettings = (url: string, token: string) => {
    setStrapiUrl(url);
    setBearerToken(token);
  };

  return (
    <main className="animate-fade-in gap-4 sm:gap-16 px-2 sm:px-12">
      <Logo />
      <MainTitle text="Respaldo de datos" uppercase />
      <MainSubtitle text="Presiona el botón para enviar los datos a Strapi" />

      <div className="flex flex-col w-full truncate bg-white text-orange-500 px-1">
        <p className="text-2xl sm:text-5xl">
          <span className="uppercase underline">Strapi URL:</span> {strapiUrl}
        </p>
        <br />
        <p className="text-2xl sm:text-5xl text-ellipsis">
          <span className="uppercase underline">Token:</span> {bearerToken}
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:gap-12">
        <ActionButton text="Sincronizar datos" onClick={updateUsers} />
        <ActionButton text="Editar datos Strapi" onClick={updateStrapiHeaders} />
        <ActionButton url="/dashboard" text="Volver" className="btn-alternate" />
      </div>

      <FooterIcons />

      {isModalOpen && (
        <StrapiSettingsModal
          currentUrl={strapiUrl}
          currentToken={bearerToken}
          onSave={handleSaveSettings}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
}
