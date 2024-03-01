import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import {
  ResetPassordRequest,
  ResetPasswordData,
  resetPasswordSchema,
} from "./validator";
import { InputPassword } from "../InputPassword";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../providers/UserProvider";
import { useContext } from "react";

export const ResetPasswordForm = () => {
  const { token } = useParams();
  const { resetPassword } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const submit = (data: ResetPassordRequest) => {
    resetPassword(data, token!);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.form1}>
      <InputPassword
        className={styles.input1}
        label="Password"
        type="password"
        id="password"
        placeholder="Digite sua senha"
        {...register("password")}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <InputPassword
        className={styles.input1}
        label="Confirme a Senha"
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
