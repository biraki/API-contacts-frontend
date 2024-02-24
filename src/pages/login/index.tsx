import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { LoginForm } from "../../components/Form/LoginForm";

export const Login = () => {
  return (
    <main className={styles.section1}>
      <h1>Login</h1>
      <section className={styles.box2}>
        <LoginForm />
        <div className={styles.box1}>
          <p>Ainda não possui uma conta ?</p>
          <Link className={styles.button1} to="/register">
            Cadastre-se
          </Link>
          <Link className={styles.button1} to="/password">Esqueci minha senha</Link>
        </div>
      </section>
    </main>
  );
};
