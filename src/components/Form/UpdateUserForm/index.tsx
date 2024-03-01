import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "../Input";
import { InputPassword } from "../InputPassword";
import styles from "./styles.module.scss";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserProvider";
import { UpdateUserData, updateUserSchema, updateUserWithPasswordSchema } from "../UpdateUserForm/validator";
import { toast } from "react-toastify";
import { AuthContext } from "../../../providers/AuthProvider";

export const UpdateUserForm = () => {
  const { updateUser, toggleUpdateUserModal } = useContext(UserContext);
  const { loggedUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: loggedUser!.name,
      email: loggedUser!.email,
      phone: loggedUser!.phone,
    },
  });
  const userId = localStorage.getItem("@id")

  const submit = (data: UpdateUserData) => {
    if(!data.email || data.email == loggedUser!.email) {delete data.email}
    if(data.phone == loggedUser!.phone) {delete data.phone}
    if(!data.password) {delete data.password}
    if(data.password) {
      try{
        updateUserWithPasswordSchema.parse(data)
        console.log(data)
      } catch (errors){
        return toast.error("A senha deve conter pelo menos 8 caracteres, um caractere especial, uma letra maiúscula e um número.")
      }
    }
    updateUser(data, userId!)
    toggleUpdateUserModal()
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.form1}>
      <Input
        className={styles.input1}
        label="Nome"
        type="text"
        id="name"
        placeholder="Digite seu nome completo"
        {...register("name")}
      />
      {errors.name && <p>{errors.name.message}</p>}
      <Input
        className={styles.input1}
        label="E-mail"
        type="email"
        id="email"
        placeholder="Digite seu e-mail"
        {...register("email")}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <Input
        className={styles.input1}
        label="Telefone"
        type="tel"
        id="phone"
        placeholder="(41)888888888"
        {...register("phone")}
      />
      {errors.phone && <p>{errors.phone.message}</p>}
      <InputPassword
        className={styles.input1}
        label="Senha"
        type="password"
        id="password"
        placeholder="Digite sua senha"
        {...register("password")}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <InputPassword
        className={styles.input1}
        label="Confirme sua Senha"
        type="password"
        id="confirmPassword"
        placeholder="Confirme sua senha"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      <button type="submit" className={styles.button1}>
        Enviar
      </button>
    </form>
  );
};