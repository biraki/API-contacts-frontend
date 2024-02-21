
import { Contact } from "../../pages/dashboard"




interface ModalProps {
    contact: Contact | undefined
}

export const ModalAdditionalInfo= ({contact}: ModalProps) => {
    
    
    if (contact == undefined){
        return
    }

    return(
        <div>
            <p>Name: {contact.name}</p>
            <p>Email: {contact.email}</p>
            <p>Email Secundário: {contact.optionalEmail}</p>
            <p>Telefone: {contact.phone}</p>
            <p>Telefone Secundário: {contact.optionalPhone}</p>
            <p>Cadastrado em: {contact.registeredAt}</p>
        </div>
    )
}