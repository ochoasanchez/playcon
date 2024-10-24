import { useState } from "react";
import { ActionButton } from "./ActionButton";

interface User {
  name: string;
  phone: string;
  company: string;
  position: string;
  email?: string;
  level?: string;
  isActive?: boolean;
}

interface UserModalProps {
  user: User;
  onClose: () => void;
}

export default function UserModal({ user, onClose }: UserModalProps) {
  const [userData, setUserData] = useState<User>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: User) =>
      u.email === user.email ? userData : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    onClose();
    debugger;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="flex w-10/12 flex-col gap-16 rounded-md bg-white p-6 py-16">
        <h2 className="text-6xl text-center  text-black">Editar usuario</h2>
        <form className="flex flex-col gap-4 text-5xl text-black">
          <label>
            <span className="text-gray-500">Nombre:</span>
            <input
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="block w-full border p-2"
            />
          </label>
          <label className="mt-4">
            <span className="text-gray-500">Teléfono:</span>
            <input
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="block w-full border p-2"
            />
          </label>
          <label className="mt-4">
            <span className="text-gray-500">Compañía:</span>
            <input
              name="company"
              value={userData.company}
              onChange={handleChange}
              className="block w-full border p-2"
            />
          </label>
          <label className="mt-4">
            <span className="text-gray-500">Posición:</span>
            <input
              name="position"
              value={userData.position}
              onChange={handleChange}
              className="block w-full border p-2"
            />
          </label>
          <label className="mt-4">
            <span className="text-gray-500">Email:</span>
            <input
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="block w-full border p-2"
            />
          </label>
          <label className="mt-4">
            <span className="text-gray-500">Level:</span>
            <input
              name="level"
              value={userData.level || ""}
              onChange={handleChange}
              className="block w-full border p-2"
            />
          </label>
        </form>
        <div className="flex justify-around gap-12 px-12">
          <ActionButton onClick={onClose} text="Cancelar" size="small" className="btn-alternate border-4 border-orange-500" />
          <ActionButton onClick={handleSave} text="Guardar" size="small" />
        </div>
      </div>
    </div>
  );
}
