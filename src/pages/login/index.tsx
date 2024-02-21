import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form" 
import { LoginData, schema } from "./validator"
import { userAuth } from "../../hooks/useAuth"
import { Link } from "react-router-dom"

export const Login = () => {

    const { signIn } = userAuth()
    const {register, handleSubmit} = useForm<LoginData> ({
        resolver: zodResolver(schema)
    })

    const submit = (data: LoginData) => {
        signIn(data)
    }

    return (
        <main>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(submit)}>
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" placeholder="Digite seu e-mail" {...register("email")}/>

                <label htmlFor="password">Senha</label>
                <input type="password" id="password" placeholder="Digite sua senha" {...register("password")}/>
                
                <button type="submit">Enviar</button>
            </form>
            <p>Ainda não possui uma conta ?</p>
            <Link to="/register">Cadastre-se</Link>
        </main>
    )
}