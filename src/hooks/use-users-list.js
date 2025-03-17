import { useState } from "react";
import useSWR from "swr";
import UserService from "../services/user-service";

const fetcher = () => UserService.list();

export default function useUsersList() {
  const { data: users, error, mutate } = useSWR("/users", fetcher);
  const [deleteError, setDeleteError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await UserService.delete(id);
      setDeleteError("");
      // Atualizar a lista otimisticamente
      mutate(users ? users.filter((user) => user.id !== id) : [], false);
    } catch (err) {
      setDeleteError("Erro ao excluir usuário.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    users,
    error,
    deleteError,
    isLoading,
    handleDelete,
  };
}
