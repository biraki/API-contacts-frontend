import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form" 
import { RegisterData, schema } from "./validator"
import { api } from "../../services/api"
import { Link, useNavigate } from "react-router-dom"


export const Register = () => {

    const {register, handleSubmit, formState: { errors }} = useForm<RegisterData> ({
        resolver: zodResolver(schema)
    })
    const navigate = useNavigate();


    const submit = async (data: RegisterData) => {
        const { confirmPassword , ...registerData} = data
        try{
            await api.post("/users", registerData)
            
        } catch (error) {
            console.log(error)
        }
        navigate("/")
    }

    return (
        <main>
            <h1>Registre-se</h1>
            <form onSubmit={handleSubmit(submit)}>
                <label htmlFor="name">Nome Completo</label>
                <input type="text" id="name" placeholder="Digite seu nome completo" {...register("name")}/>
                {errors.name ? <p>{errors.name.message}</p> : null}
                
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" placeholder="Digite seu e-mail" {...register("email")}/>
                {errors.email ? <p>{errors.email.message}</p> : null}

                <label htmlFor="phone">Telefone</label>
                <input type="tel" id="phone" placeholder="(41)888888888" {...register("phone")}/>
                {errors.phone ? <p>{errors.phone.message}</p> : null}

                <label htmlFor="password">Senha</label>
                <input type="password" id="password" placeholder="Digite sua senha" {...register("password")}/>
                {errors.password ? <p>{errors.password.message}</p> : null}

                <label htmlFor="confirmPassword">Confirme a Senha</label>
                <input type="password" id="confirmPassword" placeholder="Confirme sua senha" {...register("confirmPassword")}/>
                {errors.confirmPassword ? <p>{errors.confirmPassword.message}</p> : null}
                
                <button type="submit">Enviar</button>
                <Link to="/">Voltar</Link>
            </form>
        </main>
    )
}