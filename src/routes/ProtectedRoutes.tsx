import { Outlet } from "react-router-dom"
import { userAuth } from "../hooks/useAuth"

export const ProtectRoutes = () => {
    const {loading} = userAuth()

    if(loading){
        return <div>Carregando...</div>
    }

    return <Outlet />
}