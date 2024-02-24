import { useContext } from "react";
import { Modal } from "..";
import { UpdateContactModalContext } from "../../../providers/UpdateContactModalProvider";
import { UpdateContactForm } from "../../Form/UpdateContactForm";

export const ModalUpdateContact = () => {
  const { toggleUpdateContactModal } = useContext(UpdateContactModalContext);

  return (
    <Modal openModal={toggleUpdateContactModal}>
      <UpdateContactForm />
    </Modal>
  );
};
