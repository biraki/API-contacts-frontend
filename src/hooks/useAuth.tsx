import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"

export const userAuth = () => {
    const authContext = useContext(AuthContext)
    return authContext
}