import { useContext } from "react";
import { Modal } from "..";
import { InfoContactModalContext } from "../../../providers/InfoContactModalProvider";
import { ContactContext } from "../../../providers/ContactProvider";
import styles from "./styles.module.scss";

export const ModalInfoContact = () => {
  const { toggleInfoContactModal } = useContext(InfoContactModalContext);
  const { selectedContact } = useContext(ContactContext);

  return (
    <Modal openModal={toggleInfoContactModal}>
      <p className={styles.text1}>Name: {selectedContact?.name}</p>
      <p className={styles.text1}>Email: {selectedContact?.email}</p>
      {selectedContact?.optionalEmail && (
      <p className={styles.text1}>Email secundário: {selectedContact.optionalEmail}</p>
      )}
      <p className={styles.text1}>Telefone: {selectedContact?.phone}</p>
      {selectedContact?.optionalPhone && (
      <p className={styles.text1}>Teleone secundário: {selectedContact.optionalPhone}</p>
      )}
      <p className={styles.text1}>Registrado em: {selectedContact?.registeredAt}</p>
    </Modal>
  );
};
