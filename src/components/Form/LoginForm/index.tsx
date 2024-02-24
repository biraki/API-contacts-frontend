import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginData, loginSchema } from "./validator";
import { userAuth } from "../../../hooks/useAuth";
import { Input } from "../Input";
import { InputPassword } from "../InputPassword";
import styles from "./styles.module.scss";

export const LoginForm = () => {
  const { signIn } = userAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const submit = (data: LoginData) => {
    signIn(data);
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
      {errors?.email && <p>{errors?.email.message}</p>}
      <InputPassword
        className={styles.input1}
        label="Password"
        type="password"
        id="password"
        placeholder="Digite sua senha"
        {...register("password")}
      />
      <button type="submit" className={styles.button1}>
        Enviar
      </button>
    </form>
  );
};
