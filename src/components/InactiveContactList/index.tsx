import { useContext } from "react";
import { Contact, ContactContext } from "../../providers/ContactProvider";
import { ContactCard } from "../ContactCard";
import styles from "./styles.module.scss";

export const InctiveContactList = () => {
  const { inactiveContacts } = useContext(ContactContext);

  const renderContact = (contactsToRender: Contact[]) =>
    contactsToRender.map((contact) => (
      <ContactCard key={contact.id} contact={contact} />
    ));

  return (
    <div className={styles.box1}>
      <h3>Inctive Contacts</h3>
      <ul className={styles.list}>{renderContact(inactiveContacts)}</ul>
    </div>
  );
};
