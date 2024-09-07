import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth/next";
import CredentialsProvider, { CredentialInput } from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { AuthOptions } from "next-auth";

const prisma = new PrismaClient();

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          fullName: user.fullName,
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          permissions: user?.permissions,
        };
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          username: token.username,
          role: token.role,
          permissions: token?.permissions,
        },
      };
    },

    async jwt({ token, user }: any) {
      // after login jwt token and get the user data from here

      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          fullName: user.fullName,
          permissions: user?.permissions,
        };
      }
      return token;
    },
  },

  pages: {
    signIn: "/auth/login",
  },

  debug: false, //process.env.NODE_ENV === "development",
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
