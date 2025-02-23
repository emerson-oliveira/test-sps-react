import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import UserService from "../services/user.service";

const fetcher = () => UserService.list();

export default function UsersList() {
  const { data: users, error, mutate } = useSWR("/users", fetcher);
  const [deleteError, setDeleteError] = useState("");

  const handleDelete = async (id) => {
    try {
      await UserService.delete(id);
      setDeleteError("");
      mutate(
        users.filter((user) => user.id !== id),
        false,
      );
    } catch (err) {
      setDeleteError("Erro ao excluir usuário.");
    }
  };

  if (error) return <div>Erro ao carregar usuários.</div>;
  if (!users) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Usuários</h2>
      {deleteError && <p style={{ color: "red" }}>{deleteError}</p>}
      <Link to="/users/create">Cadastrar novo usuário</Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}{" "}
            <Link to={`/users/${user.id}`}>Editar</Link>
            <button type="button" onClick={() => handleDelete(user.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}