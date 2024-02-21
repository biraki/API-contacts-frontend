import { Contact } from "../../pages/dashboard";
import { ChangeEvent, Dispatch, SetStateAction, useContext } from "react";
import { api } from "../../services/api";
import { Modal } from "../Modal";
import { ModalContext } from "../../providers/ModalProvider";

interface CardProps {
    contact: Contact
    setContacts: Dispatch<SetStateAction<Contact[]>>
    contacts: Contact[]
}

export const Card = ({contact, setContacts, contacts}: CardProps) => {
    const {toggleModal, isOpenModal, setIsInfoModal} = useContext(ModalContext)
    // const [localContact, setLocalContact] = useState<Contact>(contact)


    

    const deleteContact = async (deleteId: string) => {
        
        try {
          await api.delete(`/contacts/${deleteId}`);
          const newContactList = contacts.filter((contact) => contact.id !== deleteId);
          setContacts(newContactList);
        } catch (error) {
          console.log(error);
        }
      };


    const updateStatus = async (event: ChangeEvent<HTMLSelectElement>) => {
        try{
            const response = await api. patch(`/contacts/${contact.id}`,
            {
                status: event.target.value,
            })

            setContacts((previusContacts) =>
            previusContacts.map((previusContact) =>
                contact.id === previusContact.id ? response.data : previusContact
            )
        )
        } catch (error){
            console.log(error)
        }

    }
    

    return (
        <div>
            <div>
                <p>{contact.name}</p>
                <p>{contact.phone}</p>
                <p>{contact.email}</p>
            </div>
            <div>
                <select onChange={updateStatus} defaultValue={contact.status}>
                    <option value={"Active"}>Active</option>
                    <option value={"Inactive"}>Inactive</option>
                </select>
                {
                isOpenModal && <Modal setContacts={setContacts} contact={contact} contacts={contacts} id={contact.id}/>
                }
                <button onClick={()=> {toggleModal();setIsInfoModal(true)}}>Mais informações</button>
                <button>Editar</button>
                <button onClick={()=> deleteContact(contact.id)}>Deletar </button>
            </div>
        </div>
    )

}