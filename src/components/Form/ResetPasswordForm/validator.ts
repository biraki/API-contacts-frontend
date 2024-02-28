import { z } from "zod"

const passwordRegex = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  );

export const resetPasswordSchema = z.object({
    password: z
    .string()
    .regex(passwordRegex, "A senha deve conter pelo menos um caractere especial, uma letra maiúscula e um número")
    .min(1, "A senha é obrigatória"),
    confirmPassword: z.string().min(1, "Confirmar a senha é obrgatório"),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  message: "As senhas não correspondem.",
  path: ["confirmPassword"],
});

const resetPasswordRequestSchema =  z.object({
  password: z
  .string()
  .regex(passwordRegex, "A senha deve conter pelo menos um caractere especial, uma letra maiúscula e um número")
  .min(1, "A senha é obrigatória"),
})

export type ResetPassordRequest = z.infer<typeof resetPasswordRequestSchema>

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>
