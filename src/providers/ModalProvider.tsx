import { ReactNode, createContext, useEffect, useState } from "react";




interface ModalProviderProps {
    children: ReactNode
}

interface ModalContextValues {
    isOpenModal: boolean
    setIsOpeModal: React.Dispatch<React.SetStateAction<boolean>>
    isAddModal: boolean
    setIsAddModal: React.Dispatch<React.SetStateAction<boolean>>
    isInfoModal: boolean
    setIsInfoModal: React.Dispatch<React.SetStateAction<boolean>>
    toggleModal: () => void
}

export const ModalContext = createContext<ModalContextValues>({} as ModalContextValues)

export const ModalProvider = ({children}: ModalProviderProps) => {

    const[isOpenModal, setIsOpeModal] = useState(false)
    const[isAddModal, setIsAddModal] = useState(false)
    const[isInfoModal, setIsInfoModal] = useState(false)

    const toggleModal = () => (setIsOpeModal(!isOpenModal), setIsAddModal(false), setIsInfoModal(false))
    
    return (
        <ModalContext.Provider value={{
            isOpenModal,
            setIsOpeModal,
            isAddModal,
            setIsAddModal,
            isInfoModal,
            setIsInfoModal,
            toggleModal}}>

            {children}
        </ModalContext.Provider>
    )
} 