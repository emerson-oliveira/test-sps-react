import React from "react";
import { Controller } from "react-hook-form";
import { useUserForm } from "hooks";
import "styles/user-form.css";

export default function UserForm() {
  const {
    isEdit,
    user,
    userError,
    errorMsg,
    isSubmitting,
    control,
    handleSubmit,
    onSubmit,
    handleCancel,
  } = useUserForm();

  if (userError) {
    return (
      <div className="user-form-container">
        <div className="form-error">
          Erro ao carregar dados do usuário. Verifique sua conexão e tente
          novamente.
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="button-cancel"
            onClick={handleCancel}
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (isEdit && !user) {
    return (
      <div className="loading-message">Carregando dados do usuário...</div>
    );
  }

  return (
    <div className="user-form-container">
      <h2 className="user-form-title">
        {isEdit ? "Editar Usuário" : "Criar Novo Usuário"}
      </h2>

      {errorMsg && <div className="form-error">{errorMsg}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Nome é obrigatório" }}
          render={({ field, fieldState: { error } }) => (
            <div className="form-group">
              <label htmlFor="name-field" className="form-label">
                Nome
              </label>
              <input
                id="name-field"
                type="text"
                className="form-input"
                placeholder="Digite o nome completo"
                {...field}
              />
              {error && <p className="form-error-message">{error.message}</p>}
            </div>
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email é obrigatório",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email inválido",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div className="form-group">
              <label htmlFor="email-field" className="form-label">
                Email
              </label>
              <input
                id="email-field"
                type="email"
                className="form-input"
                placeholder="Digite o email"
                {...field}
              />
              {error && <p className="form-error-message">{error.message}</p>}
            </div>
          )}
        />

        <Controller
          name="type"
          control={control}
          rules={{ required: "Tipo é obrigatório" }}
          render={({ field, fieldState: { error } }) => (
            <div className="form-group">
              <label htmlFor="type-field" className="form-label">
                Tipo
              </label>
              <select id="type-field" className="form-select" {...field}>
                <option value="user">Usuário</option>
                <option value="admin">Administrador</option>
              </select>
              {error && <p className="form-error-message">{error.message}</p>}
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: !isEdit ? "Senha é obrigatória" : false,
            minLength: {
              value: 6,
              message: "A senha deve ter pelo menos 6 caracteres",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div className="form-group">
              <label htmlFor="password-field" className="form-label">
                {isEdit
                  ? "Nova Senha (deixe em branco para não alterar)"
                  : "Senha"}
              </label>
              <input
                id="password-field"
                type="password"
                className="form-input"
                placeholder={
                  isEdit ? "Digite a nova senha (opcional)" : "Digite a senha"
                }
                {...field}
              />
              {error && <p className="form-error-message">{error.message}</p>}
            </div>
          )}
        />

        <div className="form-actions">
          <button
            type="button"
            className="button-cancel"
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button type="submit" className="button-save" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
