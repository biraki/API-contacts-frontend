import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { RecoverPasswordForm } from "../../components/Form/RecoverPasswordForm";

export const RecoverPassword = () => {
  return (
    <main className={styles.section1}>
      <h1>Recuperar Senha</h1>
      <section className={styles.box2}>
        <RecoverPasswordForm />
        <div className={styles.box1}>
          <Link className={styles.button1} to="/">
            Voltar
          </Link>
        </div>
      </section>
    </main>
  );
};
