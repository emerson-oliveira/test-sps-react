import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import UserService from "../services/user-service";

const fetcher = (key) => {
  const id = key.split("/").pop();
  return UserService.get(id);
};

export default function useUserForm() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(userId);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: user,
    error: userError,
    mutate,
  } = useSWR(isEdit ? `/users/${userId}` : null, fetcher);

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      name: "",
      email: "",
      type: "user",
      password: "",
    },
    mode: "onChange",
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
      setIsSubmitting(true);
      setErrorMsg("");

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
      setErrorMsg(
        "Erro ao salvar usuário. Verifique os dados e tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return {
    isEdit,
    user,
    userError,
    errorMsg,
    isSubmitting,
    control,
    formState,
    handleSubmit,
    onSubmit,
    handleCancel,
  };
}
