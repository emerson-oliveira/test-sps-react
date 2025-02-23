import React from "react";
import UserForm from "../components/user-form";
import Footer from "../components/footer";

export default function Page() {
  return (
    <div>
      <h2>Editar Usuário</h2>
      <UserForm />
      <Footer />
    </div>
  );
}