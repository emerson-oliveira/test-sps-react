import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import useSWR from "swr";
import UserService from "../services/user.service";

const fetcher = (key) => {
  const id = key.split("/").pop();
  return UserService.get(id);
};

export default function UserForm() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(userId);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    data: user,
    error: userError,
    mutate,
  } = useSWR(isEdit ? `/users/${userId}` : null, fetcher);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      type: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        type: user.type,
        password: "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        const updatedUser = {
          name: data.name,
          email: data.email,
          type: data.type,
          ...(data.password && { password: data.password }),
        };
        await UserService.update(userId, updatedUser);
        mutate({ ...user, ...updatedUser }, false);
      } else {
        await UserService.create(data);
      }
      navigate("/users");
    } catch (err) {
      setErrorMsg("Erro ao salvar usuário.");
    }
  };

  if (userError) return <div>Erro ao carregar usuário.</div>;
  if (isEdit && !user) return <div>Carregando...</div>;

  return (
    <>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Nome é obrigatório" }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <label htmlFor="name">
                Nome:
                <input id="name" type="text" {...field} />
              </label>
              {error && <p style={{ color: "red" }}>{error.message}</p>}
            </div>
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{ required: "Email é obrigatório" }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <label htmlFor="email">
                Email:
                <input id="email" type="email" {...field} />
              </label>
              {error && <p style={{ color: "red" }}>{error.message}</p>}
            </div>
          )}
        />

        <Controller
          name="type"
          control={control}
          rules={{ required: "Tipo é obrigatório" }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <label htmlFor="type">
                Tipo:
                <input id="type" type="text" {...field} />
              </label>
              {error && <p style={{ color: "red" }}>{error.message}</p>}
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: !isEdit ? "Senha é obrigatória" : false }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <label htmlFor="password">
                {isEdit
                  ? "Nova Senha (deixe em branco para não alterar):"
                  : "Senha:"}
                <input id="password" type="password" {...field} />
              </label>
              {error && <p style={{ color: "red" }}>{error.message}</p>}
            </div>
          )}
        />

        <button type="button" onClick={() => navigate(-1)}>
          Cancelar
        </button>
        <button type="submit">Salvar</button>
      </form>
    </>
  );
}