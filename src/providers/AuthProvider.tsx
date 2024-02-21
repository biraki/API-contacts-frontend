import { ReactNode, createContext, useEffect, useState } from "react";
import { LoginData } from "../pages/login/validator";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";


interface AuthProviderProps {
    children: ReactNode
}

interface AuthContextValues {
    signIn: (data: LoginData) => void
    loading: boolean
}

export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

export const AuthProvider = ({children}: AuthProviderProps) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("@token")

        if (!token){
            setLoading(false)
            return
        }

        api.defaults.headers.common.Authorization = `Bearer ${token}`
        setLoading(false)
    },[])

    const signIn = async (data: LoginData) => {

        try{
            const response = await api.post("/login", data)
            const {token} = response.data
            console.log(response)
            api.defaults.headers.common.Authorization = `Beares ${token}`
            localStorage.setItem("@token", token)
            navigate("dashboard")  
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <AuthContext.Provider value={{ signIn, loading }}>
            {children}
        </AuthContext.Provider>
    )
} 