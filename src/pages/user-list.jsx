import React from "react";
import UsersList from "../components/users-list";
import Footer from "../components/footer";

export default function Page() {
  return (
    <div>
      <h1>Gerenciamento de Usuários</h1>
      <UsersList />
      <Footer />
    </div>
  );
}