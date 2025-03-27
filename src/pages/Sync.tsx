import { ActionButton } from "../components/ActionButton";
import Logo from "../components/Logo";
import { MainTitle } from "../components/MainTitle";
import { useEffect, useState } from "react";
import { getAllUsers } from "../utils/db"; // Assuming you have this function in your db utils

export function Sync() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers(); // This should be your IndexedDB function
        setUsers(usersData || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleShareDataToMail = () => {
    const jsonString = JSON.stringify(users, null, 2);
    const mailToLink = `mailto:?subject=Data Backup&body=${encodeURIComponent(jsonString)}`;
    window.location.href = mailToLink;
  };
  
  const handleShare = async () => {
    const shareData = {
      title: 'Exported Data',
      text: JSON.stringify(users, null, 2)
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
  
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <main className="animate-fade-in gap-4 sm:gap-8 px-2 sm:px-12">
        <Logo />
        <MainTitle text="Respaldo de datos" uppercase />
        <p>Loading data...</p>
      </main>
    );
  }

  return (
    <main className="animate-fade-in gap-4 sm:gap-8 px-2 sm:px-12">
      <Logo />
      <MainTitle text="Respaldo de datos" uppercase />

      <div className="flex flex-col gap-4 sm:gap-6">
        <ActionButton 
          text="Enviar datos por correo" 
          onClick={handleShareDataToMail} 
          disabled={users.length === 0}
        />
        <ActionButton 
          text="Compartir datos a otra app" 
          onClick={handleShare} 
          disabled={users.length === 0}
        />
        <ActionButton 
          text="Descargar datos" 
          onClick={handleDownload} 
          disabled={users.length === 0}
        />
        <ActionButton url="/dashboard" text="Volver" className="btn-alternate" />
      </div>
    </main>
  );
}