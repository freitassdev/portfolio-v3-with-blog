import { z, ZodType } from "zod";

export interface zodUserType {
    fullName: string;
    username: string;
    email: string;
    password: string;
}

export const UserSchema: ZodType<zodUserType> = z.object({
  fullName: z.string().min(3, { message: "Nome muito curto" }),
  username: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Nome de usuário inválido.",
    })
    .min(3, { message: "Nome de usuário muito curto" }),
  email: z.string().email({
    message: "Email inválido",
  }),
  password: z
    .string()
    .min(8, { message: "A senha deve possuir pelo menos 8 caractéres." })
    .max(30, { message: "Senha muito longa" }),
});
