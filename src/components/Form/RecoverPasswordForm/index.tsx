import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import styles from "./styles.module.scss";
import { RecoverPasswordData, recoverPasswordSchema } from "./validator";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserProvider";

export const RecoverPasswordForm = () => {
  const { recoverPassword } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverPasswordData>({
    resolver: zodResolver(recoverPasswordSchema),
  });

  const submit = (data: RecoverPasswordData) => {
    recoverPassword(data)
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.form1}>
      <Input
        className={styles.input1}
        label="E-mail"
        type="email"
        id="email"
        placeholder="Digite seu e-mail"
        {...register("email")}
      />
      {errors.email && toast.error(errors.email.message)}
      <button type="submit" className={styles.button1}>
        Enviar
      </button>
    </form>
  );
};
