import { ResetPasswordForm } from "../../components/Form/ResetPasswordForm";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

export const ResetPassword = () => {

  return (
    <main className={styles.section1}>
      <h1>Alterar Senha</h1>
      <section className={styles.box2}>
        <ResetPasswordForm/>
        <div className={styles.box1}>
          <Link className={styles.button1} to="/">
            Voltar
          </Link>
        </div>
      </section>
    </main>
  );
};
