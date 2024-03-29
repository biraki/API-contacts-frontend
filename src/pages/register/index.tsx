import styles from "./styles.module.scss";
import { RegisterForm } from "../../components/Form/RegisterForm";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <main className={styles.section1}>
      <h1>Registre-se</h1>
      <section className={styles.box2}>
        <RegisterForm />
        <div className={styles.box1}>
          <Link className={styles.button1} to="/">
            Voltar
          </Link>
        </div>
      </section>
    </main>
  );
};
