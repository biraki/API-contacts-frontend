import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/login"
import { Dashboard } from "../pages/dashboard"
import { ProtectRoutes } from "./ProtectedRoutes"
import { Register } from "../pages/register"

export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route element={<ProtectRoutes/>}>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
        </Routes>
    )
}