import React from "react";
import { Link } from "react-router-dom";
import { UsersList, Footer } from "components";
import "styles/user-list.css";

function UserListPage() {
  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h1>Gerenciamento de Usuários</h1>
        <Link to="/users/create" className="add-user-button">
          + Adicionar Usuário
        </Link>
      </div>
      <UsersList />
      <Footer />
    </div>
  );
}

export default UserListPage;
