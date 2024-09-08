import { Session } from "next-auth";
import { z, ZodType } from "zod";

export interface zodUserType extends zodUserLoginType {
    fullName: string;
    username: string;
}

export interface zodUserLoginType {
    email: string;
    password: string;
}

export const UserSchema: ZodType<zodUserType> = z.object({
  fullName: z.string().min(3, { message: "Nome muito curto" }).max(50, { message: "Nome muito longo, abrevie." }),
  username: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Nome de usuário inválido.",
    })
    .min(3, { message: "Nome de usuário muito curto" }).max(30, { message: "Nome de usuário muito longo" }),
  email: z.string().email({
    message: "Email inválido",
  }).max(50, { message: "Email muito longo" }),
  password: z
    .string()
    .min(8, { message: "A senha deve possuir pelo menos 8 caractéres." })
    .max(30, { message: "Senha muito longa" }),
});

export const UserLoginSchema: ZodType<zodUserLoginType> = z.object({
  email: z.string().email({
    message: "Email inválido",
  }),
  password: z.string().min(8, { message: "Senha muito curta" }),
});
