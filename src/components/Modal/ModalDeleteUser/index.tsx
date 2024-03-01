import { useContext } from "react";
import { Modal } from "..";

import { AuthContext } from "../../../providers/AuthProvider";
import { UserContext } from "../../../providers/UserProvider";

export const ModalDeleteUser = () => {
  const { userLogout } = useContext(AuthContext);
  const { toggleDeleteUserModal, deleteUser } = useContext(UserContext);
  const userId = localStorage.getItem("@id")

  return (
    <Modal openModal={toggleDeleteUserModal}>
      <h3>Tem certeza que desejar deletar a sua conta ?</h3>
      <div>
        <button onClick={() =>{deleteUser(userId!);toggleDeleteUserModal();userLogout}}>Confirmar</button>
        <button onClick={toggleDeleteUserModal}>Cancelar</button>
      </div>
    </Modal>
  );
};