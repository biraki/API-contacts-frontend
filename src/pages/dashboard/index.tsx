import { useContext, useEffect, useState } from "react"
import { api } from "../../services/api"
import { Card } from "../../components/Card"
import { ModalContext } from "../../providers/ModalProvider"


export interface Contact
 {
    id: string
    status: string
    name: string
    email: string
    optionalEmail: string | null
    phone: string
    optionalPhone: string | null
    registeredAt: string
}

export const Dashboard = () => {

    const {toggleModal, setIsAddModal} = useContext(ModalContext)
    const[contacts, setContacts] = useState<Contact[]>([])
    useEffect(() => {
        (async () => {
            const response = await api.get<Contact[]>("contacts")
            setContacts(response.data)
        })()
        
    }, [])
    const renderContact = (contactsToRender: Contact[]) => 
    contactsToRender.map((contact) => 
        
    <Card key={contact.id} setContacts={setContacts} contact={contact} contacts={contacts}/>
    
    )

    const activeClient = contacts.filter(active => active.status === "Active")
    const inactiveClient = contacts.filter(inactive => inactive.status === "Inactive")


    return (
        <div>
            <header>
                <button type="button" onClick= {() =>{toggleModal(); setIsAddModal(true) }}>Add Contact</button>
            </header>

            <main>
                <h3>Active Contacts</h3>
                <div>{renderContact(activeClient)}</div>
                <h3>Inactive Contacts</h3>
                <div>{renderContact(inactiveClient)}</div>
            </main>
        </div>
    )
}