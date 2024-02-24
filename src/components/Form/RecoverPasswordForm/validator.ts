import {z} from "zod"

export const recoverPasswordSchema = z.object({
    email: z.string().email("Email invalido"),
})

export type RecoverPasswordData = z.infer<typeof recoverPasswordSchema>