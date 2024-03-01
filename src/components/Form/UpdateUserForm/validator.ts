import { z } from "zod";

const passwordRegex = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);

export const updateUserSchema = z
  .object({
    email: z.string().email("Email invalido"),
    password: z.string(),
    name: z.string(),
    phone: z.string(),
    confirmPassword: z.string(),
  })
  .partial()
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não correspondem.",
    path: ["confirmPassword"],
  });

export const updateUserWithPasswordSchema = z
  .object({
    email: z.string().email("Email invalido"),
    password: z.string().regex(passwordRegex, "Senha invalida"),
    name: z.string(),
    phone: z.string(),
    confirmPassword: z.string(),
  })
  .partial()
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não correspondem.",
    path: ["confirmPassword"],
  });

export type UpdateUserData = z.infer<typeof updateUserSchema>;
