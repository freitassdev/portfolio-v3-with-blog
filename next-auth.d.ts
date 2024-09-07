import { zodUserType } from "@/zod/types";
import NextAuth, { DefaultSession, Session } from "next-auth";
import { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: zodUserType & DefaultSession["user"];
  }
}
