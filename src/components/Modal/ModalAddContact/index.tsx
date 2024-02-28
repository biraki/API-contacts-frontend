import { useContext } from "react";
import { Modal } from "..";
import { AddContactForm } from "../../Form/AddContactForm";
import { ContactContext } from "../../../providers/ContactProvider";

export const ModalAddContact = () => {
  const { toggleAddContactModal } = useContext(ContactContext);

  return (
    <Modal openModal={toggleAddContactModal}>
      <AddContactForm />
    </Modal>
  );
};
