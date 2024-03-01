import { useContext } from "react";
import { Modal } from "..";
import { AuthContext } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

export const ModalError = () => {
  const { setIsErrorModalOpen } = useContext(AuthContext);
  const navigate = useNavigate()
  
  return (
    <Modal>
      <div className={styles.box1}>
        <h1>Você não esta Autenticado</h1>
        <button onClick={() => {setIsErrorModalOpen(false); navigate("/")}}>Voltar para o login</button>
      </div>
    </Modal>
  );
};
