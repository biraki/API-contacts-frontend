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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  addContact: (data: CreateContactData) => void;
  deleteContact: (deleteId: string) => void;
  updateContact: (data: UpdateContactData, contactId: string) => void;
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
  isAddContactModalOpen: boolean;
  toggleAddContactModal: () => void;
  isInfoContactModalOpen: boolean;
  toggleInfoContactModal: () => void;
  toggleUpdateContactModal: () => void;
  isUpdateContactModalOpen: boolean;
}

export const ContactContext = createContext<ContactContextValues>(
  {} as ContactContextValues
);

export const ContactProvider = ({ children }: ContactProviderProps) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contact, setContact] = useState<Contact>();
  const [selectedContact, setSelectedContact] = useState<Contact>();
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [isInfoContactModalOpen, setIsInfoContactModalOpen] = useState(false);
  const [isUpdateContactModalOpen, setIsUpdateContactModalOpen] =
    useState(false);

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

  const addContact = async (data: CreateContactData) => {
    try {
      const response = await api.post("/contacts", data);
      setContacts((previousContacts) => [response.data, ...previousContacts]);
      toast.success("Contato adicionado com sucesso");
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
      toast.success("Contato deletado com sucesso");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (data: UpdateContactData, contactId: string) => {
    try {
      const response = await api.patch(`/contacts/${contactId}`, data);

      setContacts((previusContacts) =>
        previusContacts.map((previusContact) =>
          contactId === previusContact.id ? response.data : previusContact
        )
      );
      toast.success("Contato atualizado com sucesso");
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
    toast.success("Pdf gerado com secusso");
  };

  const toggleAddContactModal = () => {
    setIsAddContactModalOpen(!isAddContactModalOpen);
  };

  const toggleInfoContactModal = () => {
    setIsInfoContactModalOpen(!isInfoContactModalOpen);
  };

  const toggleUpdateContactModal = () => {
    setIsUpdateContactModalOpen(!isUpdateContactModalOpen);
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
        isAddContactModalOpen,
        toggleAddContactModal,
        toggleInfoContactModal,
        isInfoContactModalOpen,
        toggleUpdateContactModal,
        isUpdateContactModalOpen,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};