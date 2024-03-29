import { useContext } from "react";
import { Contact, ContactContext } from "../../providers/ContactProvider";
import { MdModeEdit } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";
import styles from "./styles.module.scss";

interface ContactCardProps {
  contact: Contact;
}

export const ContactCard = ({ contact }: ContactCardProps) => {
  const {
    deleteContact,
    setSelectedContact,
    updateStatus,
    toggleInfoContactModal,
    toggleUpdateContactModal,
  } = useContext(ContactContext);

  return (
    <li className={styles.card1}>
      <div className={styles.textBox}>
        <h4>Name: {contact.name}</h4>
        <p>Telefone: {contact.phone}</p>
        <p>Email: {contact.email}</p>
      </div>
      <div className={styles.buttonBox}>
        <select
          onChange={(e) => {
            updateStatus(e, contact);
          }}
          defaultValue={contact.status}
        >
          <option value={"Active"}>Active</option>
          <option value={"Inactive"}>Inactive</option>
        </select>
        <button
          className={styles.button1}
          onClick={() => {
            toggleUpdateContactModal();
            setSelectedContact(contact);
          }}
        >
          <MdModeEdit />
        </button>
        <button
          className={styles.button1}
          onClick={() => {
            toggleInfoContactModal();
            setSelectedContact(contact);
          }}
        >
          <IoIosInformationCircle />
        </button>
        <button
          className={styles.button1}
          onClick={() => deleteContact(contact.id)}
        >
          <IoTrashBin />
        </button>
      </div>
    </li>
  );
};
