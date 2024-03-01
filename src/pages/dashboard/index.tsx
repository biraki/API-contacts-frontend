import { useContext } from "react";
import { ActiveContactList } from "../../components/ActiveContactList";
import { InctiveContactList } from "../../components/InactiveContactList";
import { ModalAddContact } from "../../components/Modal/ModalAddContact";
import { ModalInfoContact } from "../../components/Modal/ModalInfoContact";
import { ContactContext } from "../../providers/ContactProvider";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "./styles.module.scss";
import { ModalUpdateContact } from "../../components/Modal/ModalUpdateContact";
import { ModalDeleteUser } from "../../components/Modal/ModalDeleteUser";
import { UserContext } from "../../providers/UserProvider";
import { ModalUpdateUser } from "../../components/Modal/ModalUpdateUser";

export const Dashboard = () => {
  const {toggleAddContactModal, isAddContactModalOpen, isInfoContactModalOpen, isUpdateContactModalOpen, generatePdf} = useContext(ContactContext)
  const { userLogout } = useContext(AuthContext)
  const { toggleDeleteUserModal, isDeleteUserModalOpen, toggleUpdateUserModal, isUpdateUserModalOpen, getUserById } = useContext(UserContext)
  const userId = localStorage.getItem("@id")

  return (
    <div>
      <header className={styles.header}>
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            toggleAddContactModal();
          }}
        >
          Add Contact
        </button>
        <button className={styles.button} type="button" onClick={generatePdf}>Exportar para PDF</button>
        <button className={styles.button} type="button" onClick={() => {getUserById(userId!); toggleUpdateUserModal()}}>Editar conta</button>
        <button className={styles.button} type="button" onClick={toggleDeleteUserModal}>Excluir conta</button>
        <button  className={styles.button} type="button" onClick={userLogout}>Logout</button>
      </header>
      <main className={styles.section1}>
        <h2>Contatos</h2>
        <section className={styles.section2}>
          <ActiveContactList />
          <InctiveContactList />
        </section>
      </main>
      {isInfoContactModalOpen && <ModalInfoContact />}
      {isAddContactModalOpen && <ModalAddContact/>}
      {isUpdateContactModalOpen && <ModalUpdateContact/>}
      {isDeleteUserModalOpen && <ModalDeleteUser/>}
      {isUpdateUserModalOpen && <ModalUpdateUser/>}
    </div>
  );
};
