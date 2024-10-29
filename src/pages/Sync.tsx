import { useState } from "react";
import axios from "axios";
import { ActionButton } from "../components/ActionButton";
import Logo from "../components/Logo";
import { MainTitle } from "../components/MainTitle";
import { StrapiSettingsModal } from "../components/StrapiSettingsModal";
import EditIcon from "../components/EditIcon";

let initialStrapiUrl = import.meta.env.VITE_STRAPI_URL;
let initialBearerToken = `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`;

export function Sync() {
  const [strapiUrl, setStrapiUrl] = useState(initialStrapiUrl);
  const [bearerToken, setBearerToken] = useState(initialBearerToken);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const updateUsers = async () => {
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

  const handleShareDataToMail = () => {
    const jsonString = JSON.stringify(users, null, 2); // Format JSON for readability
  
    // Use encodeURIComponent to handle special characters in JSON
    const mailToLink = `mailto:?subject=Data Backup&body=${encodeURIComponent(jsonString)}`;
  
    // Open native mail app with prefilled email
    window.location.href = mailToLink;
  };
  
  const handleShare = async () => {
    
    const shareData = {
      title: 'Exported Data',
      text: JSON.stringify(users, null, 2) // Pretty-print the JSON
    };

    try {
      await navigator.share(shareData);
      console.log('Data shared successfully!');
    } catch (error) {
      console.error('Sharing failed', error);
    }
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(users, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'exported-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    URL.revokeObjectURL(url); // Clean up the URL after download
  };
  
  

  return (
    <main className="animate-fade-in gap-4 sm:gap-16 px-2 sm:px-12">
      <Logo />
      <MainTitle text="Respaldo de datos" uppercase />

      <div className="flex w-full gap-4">
        <div className="flex flex-col w-full truncate bg-white text-orange-500 px-1">
          <p className="text-2xl sm:text-5xl">
            <span className="uppercase underline">Strapi URL:</span> {strapiUrl}
          </p>
          <br />
          <p className="text-2xl sm:text-5xl text-ellipsis">
            <span className="uppercase underline">Token:</span> {bearerToken}
          </p>
        </div>
        
        <button onClick={updateStrapiHeaders}>
          <EditIcon />
        </button>
        
      </div>

      <div className="flex flex-col gap-4 sm:gap-12">
        <ActionButton text="Enviar datos a Strapi" onClick={updateUsers} />
        <ActionButton text="Enviar datos por correo" onClick={handleShareDataToMail} />
        <ActionButton text="Compartir datos a otra app" onClick={handleShare} />
        <ActionButton text="Descargar datos" onClick={handleDownload} />
        <ActionButton url="/dashboard" text="Volver" className="btn-alternate" />
      </div>

      {/* <FooterIcons /> */}

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
