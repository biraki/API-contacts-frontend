import { useContext } from "react"
import { ModalContext } from "../providers/ModalProvider"

export const ModalAuth = () => {
    const modalContext = useContext(ModalContext)
    return modalContext
}