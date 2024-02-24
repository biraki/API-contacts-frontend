import {z} from "zod"

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );


export const addContactSchema = z.object({
    email: z.string().email("Email invalido").min(1, "O email é obrigatório"),
    optionalEmail: z.string().nullable().default(null),
    name: z.string().min(1, "O nome é obrigatório"),
    phone: z.string().regex(phoneRegex, "Telefone invalido").min(1, "O telefone é obrigatório"),
    optionalPhone: z.string().nullable().default(null)
})

export type CreateContactData = z.infer<typeof addContactSchema>