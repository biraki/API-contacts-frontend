import {
  ChangeEvent,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import { CreateContactData } from "../components/Form/AddContactForm/validator";
import { UpdateContactData } from "../components/Form/UpdateContactForm/validator";

export interface Contact {
  id: string;
  status: string;
  name: string;
  email: string;
  optionalEmail?: string | undefined;
  phone: string;
  optionalPhone?: string | undefined;
  registeredAt: string;
}

interface ContactProviderProps {
  children: ReactNode;
}

interface ContactContextValues {
  addContact: (data: CreateContactData, closeFunction: () => void) => void;
  deleteContact: (deleteId: string) => void;
  updateContact: (
    data: UpdateContactData,
    contactId: string,
    closeFunction: () => void
  ) => void;
  contacts: Contact[];
  contact: Contact | undefined;
  setContact: React.Dispatch<React.SetStateAction<Contact | undefined>>;
  activeContacts: Contact[];
  inactiveContacts: Contact[];
  selectedContact: Contact | undefined;
  setSelectedContact: React.Dispatch<React.SetStateAction<Contact | undefined>>;
  updateStatus: (
    event: ChangeEvent<HTMLSelectElement>,
    contact: Contact
  ) => void;
  generatePdf: () => void;
}

export const ContactContext = createContext<ContactContextValues>(
  {} as ContactContextValues
);

export const ContactProvider = ({ children }: ContactProviderProps) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contact, setContact] = useState<Contact>();
  const [selectedContact, setSelectedContact] = useState<Contact>();

  const activeContacts = contacts.filter(
    (contact) => contact.status === "Active"
  );
  const inactiveContacts = contacts.filter(
    (contact) => contact.status === "Inactive"
  );

  useEffect(() => {
    (async () => {
      const response = await api.get<Contact[]>("contacts");
      setContacts(response.data);
    })();
  }, []);

  const addContact = async (
    data: CreateContactData,
    closeFunction: () => void
  ) => {
    try {
      const response = await api.post("/contacts", data);
      setContacts((previousContacts) => [response.data, ...previousContacts]);
      closeFunction();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async (deleteId: string) => {
    try {
      await api.delete(`/contacts/${deleteId}`);
      const newContactList = contacts.filter(
        (contact) => contact.id !== deleteId
      );
      setContacts(newContactList);
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (
    data: UpdateContactData,
    contactId: string,
    closeFunction: () => void
  ) => {
    try {
      const response = await api.patch(`/contacts/${contactId}`, data);

      setContacts((previusContacts) =>
        previusContacts.map((previusContact) =>
          contactId === previusContact.id ? response.data : previusContact
        )
      );
      closeFunction();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    event: ChangeEvent<HTMLSelectElement>,
    contact: Contact
  ) => {
    const response = await api.patch(`contacts/${contact.id}`, {
      status: event.target.value,
    });

    setContacts((previusContacts) =>
      previusContacts!.map((previusContact) =>
        contact.id === previusContact.id ? response.data : previusContact
      )
    );
  };

  const generatePdf = async () => {
    const response = await api.get("users/pdf", {
      responseType: "arraybuffer",
    });
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(pdfBlob);
    link.download = "Contatos.pdf";
    link.click();
  };

  return (
    <ContactContext.Provider
      value={{
        selectedContact,
        setSelectedContact,
        addContact,
        deleteContact,
        contacts,
        updateContact,
        setContact,
        contact,
        activeContacts,
        inactiveContacts,
        updateStatus,
        generatePdf,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
