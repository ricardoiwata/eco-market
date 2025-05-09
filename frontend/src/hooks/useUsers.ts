import { useEffect, useState } from "react"

import api from "../services/api"

export const useUsers = () => {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await api.get("/users")
      setUsers(response.data)
      return response.data
    } catch (err) {
      console.error("Error fetching users:", err)
      setError("Não foi possível carregar os usuários. Por favor, tente novamente mais tarde.")
      return []
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (id: string) => {
    setLoading(true)
    try {
      await api.delete(`/users/${id}`)
      setUsers(users.filter((user) => user._id !== id))
      return true
    } catch (err) {
      console.error("Error deleting user:", err)
      setError("Não foi possível excluir o usuário. Por favor, tente novamente mais tarde.")
      return false
    } finally {
      setLoading(false)
    }
  }

  // NOVA FUNÇÃO PARA ATUALIZAR O PAPEL DO USUÁRIO
  const updateUserRole = async (id: string, role: string) => {
    setLoading(true);
    try {
      const res = await api.put(`/users/${id}`, { role });
      // Atualiza o usuário no array local
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, role: res.data.role } : user
        )
      );
      return true;
    } catch (err) {
      console.error("Error updating user role:", err);
      setError("Não foi possível atualizar a função do usuário. Por favor, tente novamente mais tarde.");
      return false;
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers()
  }, [])

  return {
    users,
    loading,
    error,
    fetchUsers,
    deleteUser,
    updateUserRole, // Adiciona a nova função ao retorno
  }
}
