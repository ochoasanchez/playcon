import { useState } from "react";
import { ActionButton } from "../components/ActionButton";

interface StrapiSettingsModalProps {
  currentUrl: string;
  currentToken: string;
  onSave: (url: string, token: string) => void;
  onClose: () => void;
}

export function StrapiSettingsModal({
  currentUrl,
  currentToken,
  onSave,
  onClose,
}: StrapiSettingsModalProps) {
  const [url, setUrl] = useState(currentUrl);
  const [token, setToken] = useState(currentToken);

  const handleSave = () => {
    onSave(url, token);
    onClose();
  };

  const handleReset = () => {
    setUrl(import.meta.env.VITE_STRAPI_URL);
    setToken(`Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`);
  };

// debugger;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-10/12 lg:w-8/12 flex flex-col gap-4 lg:gap-8 rounded-md bg-white p-6">
        <h2 className="text-3xl text-center text-black">Editar configuración de Strapi</h2>
        <form className="flex flex-col gap-4">
          <label className="text-lg">
            <span className="text-gray-500">Strapi URL:</span>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="block w-full border p-2 text-black"
              placeholder={currentUrl}
            />
          </label>
          <label className="text-lg">
            <span className="text-gray-500">Bearer Token:</span>
            <textarea
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="block w-full border p-2 text-black"
              rows={6}
              placeholder={currentToken}
            />
          </label>
        </form>
        <ActionButton onClick={handleReset} text="Restablecer" size="small" className="text-green-500 bg-white border-2 border-green-500 py-1" />
        <div className="flex justify-around gap-4">
          <ActionButton onClick={onClose} text="Cancelar" size="small" className="btn-alternate border-2 border-orange-500 py-1"/>
          <ActionButton onClick={handleSave} text="Guardar" size="small" className="py-1"/>
        </div>
      </div>
    </div>
  );
}
