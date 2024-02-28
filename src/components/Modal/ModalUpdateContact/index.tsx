import { useContext } from "react";
import { Modal } from "..";
import { UpdateContactForm } from "../../Form/UpdateContactForm";
import { ContactContext } from "../../../providers/ContactProvider";

export const ModalUpdateContact = () => {
  const { toggleUpdateContactModal } = useContext(ContactContext);

  return (
    <Modal openModal={toggleUpdateContactModal}>
      <UpdateContactForm />
    </Modal>
  );
};
