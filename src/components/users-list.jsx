import React from "react";
import { Link } from "react-router-dom";
import { useUsersList } from "hooks";
import "../styles/users-list.css";

export default function UsersList() {
  const { users, error, deleteError, isLoading, handleDelete } = useUsersList();

  if (error)
    return (
      <div className="error-container">
        Erro ao carregar usuários. Verifique sua conexão e tente novamente.
      </div>
    );
  if (!users)
    return <div className="loading-container">Carregando usuários...</div>;

  if (users.length === 0) {
    return (
      <div className="empty-list">
        Nenhum usuário encontrado. Adicione um novo usuário para começar.
      </div>
    );
  }

  return (
    <div className="users-container">
      {deleteError && <div className="error-container">{deleteError}</div>}

      <table className="users-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td data-label="Nome">
                <span className="user-name">{user.name}</span>
              </td>
              <td data-label="Email">
                <span className="user-email">{user.email}</span>
              </td>
              <td data-label="Tipo">
                <span className="user-type">{user.type}</span>
              </td>
              <td data-label="Ações">
                <div className="action-buttons">
                  <Link to={`/users/${user.id}`} className="edit-button">
                    Editar
                  </Link>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDelete(user.id)}
                    disabled={isLoading}
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
