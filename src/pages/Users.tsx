import { useState, useEffect } from "react";
import { ActionButton } from "../components/ActionButton";
import { MainTitle } from "../components/MainTitle";
import UserModal from "../components/UserModal";
import { getAllUsers } from "../utils/db";

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (isLoading) {
    return (
      <main className="px-4 sm:px-12 gap-6">
        <MainTitle text="Lista de Usuarios" />
        <p>Loading users...</p>
      </main>
    );
  }

  return (
    <main className="px-4 sm:px-12 gap-6">
      <MainTitle text="Lista de Usuarios" />
      <div className="h-4/6 w-full overflow-y-auto">
        <table className="w-full">
          <thead className="table__head">
            <tr className="rounded-md bg-green-500 text-2xl sm:text-3xl">
              <th className="p-2">#</th>
              <th className="py-2">Nombre</th>
              <th className="py-2">Compañía</th>
            </tr>
          </thead>
          <tbody className="text-center text-2xl sm:text-3xl">
            {users.map((user, index) => (
              <tr
                key={`key-${index + 1}`}
                className="bg-teal-700 border-b-2 border-white last:border-none"
              >
                <td className="py-4">{index + 1}</td>
                <td className="py-4">{user.name}</td>
                <td className="py-4">{user.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ActionButton url="/dashboard" text="Volver" className="btn-alternate"/>

      {isModalOpen && selectedUser && (
        <UserModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </main>
  );
}