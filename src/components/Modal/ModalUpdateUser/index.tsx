import { useContext } from "react";
import { Modal } from "..";
import { UpdateUserForm } from "../../Form/UpdateUserForm";
import { UserContext } from "../../../providers/UserProvider";

export const ModalUpdateUser = () => {
  const { toggleUpdateUserModal } = useContext(UserContext);

  return (
    <Modal openModal={toggleUpdateUserModal}>
      <UpdateUserForm />
    </Modal>
  );
};
