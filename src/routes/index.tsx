import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/login"
import { Dashboard } from "../pages/dashboard"
import { ProtectRoutes } from "./ProtectedRoutes"
import { Register } from "../pages/register"
import { ContactProvider } from "../providers/ContactProvider"
import { AxionsInterceptor } from "../components/AxiosInterceptor"
import { RecoverPassword } from "../pages/recoverPassword"
import { ResetPassword } from "../pages/resetPassword"

export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/password" element={<RecoverPassword/>}/>
            <Route path="/password/:token" element={<ResetPassword/>}/>
            <Route element={<ProtectRoutes/>}>
                <Route path="/dashboard" element={<ContactProvider><AxionsInterceptor><Dashboard/></AxionsInterceptor></ContactProvider>}/>
            </Route>
        </Routes>
    )
}