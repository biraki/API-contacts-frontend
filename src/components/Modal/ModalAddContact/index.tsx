import { useContext } from "react";

import { Modal } from "..";
import { AddContactModalContext } from "../../../providers/AddContactModalProvider";
import { AddContactForm } from "../../Form/AddContactForm";

export const ModalAddContact = () => {
  const { toggleAddContactModal } = useContext(AddContactModalContext);

  return (
    <Modal openModal={toggleAddContactModal}>
      <AddContactForm />
    </Modal>
  );
};
