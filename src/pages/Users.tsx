import { useState } from "react";
import { ActionButton } from "../components/ActionButton";
import { MainTitle } from "../components/MainTitle";
import ViewIcon from "../components/ViewIcon";
import UserModal  from "../components/UserModal";

export function Users() {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  // State to control modal visibility and selected user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleViewClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <main className="animate-slide-in-1 px-4 lg:px-12">
      <MainTitle text="Lista de Usuarios" />
      <div className="mt-12 h-4/6 w-full overflow-y-auto">
        <table className="w-full">
          <thead className="table__head">
            <tr className="rounded-md bg-orange-500 text-2xl lg:text-5xl">
              <th className="p-2">#</th>
              <th className="py-2">Nombre</th>
              <th className="py-2">Compañía</th>
              <th className="py-2">Nivel</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody className="text-center text-2xl lg:text-5xl">
            {users.map((user, index) => (
              <tr
                key={`key-${index + 1}`}
                className="bg-teal-700 border-b-2 border-white last:border-none"
              >
                <td className="py-4">{index + 1}</td>
                <td className="py-4">{user.name}</td>
                <td className="py-4">{user.company}</td>
                <td className="py-4">{user.level ? user.level : "-"}</td>
                <td className="py-4">
                  <button onClick={() => handleViewClick(user)}>
                    <ViewIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ActionButton url="/dashboard" text="Volver"  className="btn-alternate"/>

      {/* Render the modal */}
      {isModalOpen && selectedUser && (
        <UserModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </main>
  );
}
