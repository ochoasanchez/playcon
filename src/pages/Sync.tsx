import { ActionButton } from "../components/ActionButton";
import Logo from "../components/Logo";
import { MainTitle } from "../components/MainTitle";


export function Sync() {

  const users = JSON.parse(localStorage.getItem('users') || '[]');


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
    <main className="animate-fade-in gap-4 sm:gap-8 px-2 sm:px-12">
      <Logo />
      <MainTitle text="Respaldo de datos" uppercase />

      <div className="flex flex-col gap-4 sm:gap-6">
        <ActionButton text="Enviar datos por correo" onClick={handleShareDataToMail} />
        <ActionButton text="Compartir datos a otra app" onClick={handleShare} />
        <ActionButton text="Descargar datos" onClick={handleDownload} />
        <ActionButton url="/dashboard" text="Volver" className="btn-alternate" />
      </div>

      {/* <FooterIcons /> */}
    </main>
  );
}
