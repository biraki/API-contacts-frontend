import { Dispatch, SetStateAction } from "react"
import { Contact } from "../../pages/dashboard"

import { CreateContactData, schema } from "./validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "../../services/api"
import { useForm } from "react-hook-form"



interface ModalProps {
    toggleModal: () => void
    setContacts: Dispatch<SetStateAction<Contact[]>>
}

export const ModalAddContact= ({toggleModal, setContacts}: ModalProps) => {

    const {register, handleSubmit, formState: { errors }} = useForm<CreateContactData> ({
        resolver: zodResolver(schema)
    })

    const createContact = async (data: CreateContactData) => {
        const response = await api.post<Contact>("/contacts", {...data})

        setContacts(previousContacts => [response.data, ...previousContacts])
        toggleModal()
    }

    return(
        <form>
            adadas
        </form>
    )
}