import { useContext } from "react";
import { Contact, ContactContext } from "../../providers/ContactProvider";
import { ContactCard } from "../ContactCard";
import styles from "./styles.module.scss";

export const ActiveContactList = () => {
  const { activeContacts } = useContext(ContactContext);

  const renderContact = (contactsToRender: Contact[]) =>
    contactsToRender.map((contact) => (
      <ContactCard key={contact.id} contact={contact} />
    ));

  return (
    <div className={styles.box1}>
      <h3>Active Contacts</h3>
      <ul className={styles.list}>{renderContact(activeContacts)}</ul>
    </div>
  );
};
