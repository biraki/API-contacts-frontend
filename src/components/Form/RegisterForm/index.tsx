import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterData, registerSchema } from "./validator";
import { userAuth } from "../../../hooks/useAuth";
import { Input } from "../Input";
import { InputPassword } from "../InputPassword";
import styles from "./styles.module.scss";

export const RegisterForm = () => {
  const { registerUser } = userAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const submit = (data: RegisterData) => {
    registerUser(data);
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
