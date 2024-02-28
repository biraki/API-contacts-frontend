import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const passwordRegex = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);

export const registerSchema = z
  .object({
    email: z.string().email("Email invalido").min(1, "O email é obrigatório"),
    password: z
      .string()
      .regex(passwordRegex, "A senha deve conter pelo menos um caractere especial, uma letra maiúscula e um número")
      .min(1, "A senha é obrigatória"),
    name: z.string().min(1, "O nome é obrigatório"),
    phone: z
      .string()
      .regex(phoneRegex, "Telefone invalido")
      .min(1, "O telefone é obrigatório"),
    confirmPassword: z.string().min(1, "Confirmar a senha é obrgatório"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não correspondem.",
    path: ["confirmPassword"],
  });
export type RegisterData = z.infer<typeof registerSchema>;
