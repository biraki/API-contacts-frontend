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
        <form onSubmit={handleSubmit(createContact)}>

            <label htmlFor="name">Nome Completo</label>
            <input type="text" id="name" placeholder="Digite seu nome completo" {...register("name")}/>
            {errors.name ? <p>{errors.name.message}</p> : null}
                
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" placeholder="Digite seu e-mail" {...register("email")}/>
            {errors.email ? <p>{errors.email.message}</p> : null}

            <label htmlFor="optionalEmail">Email Opcional</label>
            <input type="email" id="optionalEmail" placeholder="Digite seu email secundário" {...register("optionalEmail")}/>
            
            <label htmlFor="phone">Telefone</label>
            <input type="tel" id="phone" placeholder="(41)888888888" {...register("phone")}/>
            {errors.phone ? <p>{errors.phone.message}</p> : null}

            <label htmlFor="optionalPhone">Telefone Opcional</label>
            <input type="tel" id="optionalPhone" placeholder="Digite seu telefone secundário" {...register("optionalPhone")}/>
                
            <button type="submit">Enviar</button>
        </form>
    )
}