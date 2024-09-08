import { zodUserType } from "@/zod/types";
import NextAuth, { DefaultSession, Session } from "next-auth";
import { User } from "next-auth";

export interface fullUserType extends zodUserType {
  id: string;
  role: "ADMIN" | "USER" | "MODERATOR";
  permissions: string[];
}

declare module "next-auth" {
  interface Session {
    user: fullUserType & DefaultSession["user"];
  }
}