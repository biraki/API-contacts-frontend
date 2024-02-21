import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import { Container } from "./styles"
import { ModalAddContact } from "../ModalAddContact"
import { Contact } from "../../pages/dashboard"
import { ModalAdditionalInfo } from "../ModalAdditionalInfo"
import { ModalContext } from "../../providers/ModalProvider"



interface ModalProps {
    blockClosing?: boolean
    setContacts: Dispatch<SetStateAction<Contact[]>>
    contact: any
    contacts:Contact[]
    id: string
}

export const Modal = ({setContacts, blockClosing, contacts, contact, id}: ModalProps) => {
    const {toggleModal, isAddModal, isInfoModal} = useContext(ModalContext)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if(!ref.current) {
                return
            }

            if (!event.target) {
                return
            }

            if(!ref.current.contains(event.target as HTMLElement)) {
                toggleModal()
            }
        }

        window.addEventListener("mousedown", handleClick)

        return () => {
            window.removeEventListener("mousedown", handleClick)
        }
    }, [toggleModal])


    return (
        <Container>
            <div ref={blockClosing ? null : ref}>
                {isAddModal && <ModalAddContact toggleModal={toggleModal} setContacts={setContacts}/>}
                {isInfoModal && <ModalAdditionalInfo contact={contact} />}
            </div>
        </Container>
    )
}