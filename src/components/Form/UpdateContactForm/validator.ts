import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const updateContactSchema = z
  .object({
    email: z.string().email("Email invalido").optional(),
    optionalEmail: z.string().optional(),
    name: z.string().optional(),
    phone: z.string().regex(phoneRegex, "Telefone invalido").optional(),
    optionalPhone: z.string().optional(),
  })
  .partial();

export type UpdateContactData = z.infer<typeof updateContactSchema>;
