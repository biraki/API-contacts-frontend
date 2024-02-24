import { ReactNode, useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { ModalError } from "../Modal/ModalError";
import axios from "axios";
import { api } from "../../services/api";

interface AxionsInterceptorProps {
    children: ReactNode
}

export const AxionsInterceptor = ({children}: AxionsInterceptorProps) => {
    const { isErrorModalOpen, setIsErrorModalOpen } = useContext(AuthContext);

    useEffect(() => {
        const errorInterceptor = ( error: Error) => {
            if(!axios.isAxiosError(error)) {
                return Promise.reject
            }

            if(error.response?.status === 401) {
                setIsErrorModalOpen(true)
            }

            return Promise.reject(error)
        }

        const interceptor= api.interceptors.response.use(null, errorInterceptor)

        return () => api.interceptors.response.eject(interceptor)
    }, [])


    return (
        <>
            {isErrorModalOpen && <ModalError/>}
            {children}
        </>
    )
}