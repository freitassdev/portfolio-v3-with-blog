// import { PrismaClient } from "@prisma/client";
// import { AuthOptions } from "next-auth";
// const bcrypt = require("bcrypt");
// const { compare } = bcrypt;
// const prisma = new PrismaClient();

// export const authOptions: AuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "email", type: "email" },
//         password: { label: "password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         if (!credentials || !credentials.email || !credentials.password) {
//           return null;
//         }

//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });

//         console.log("user found", user);

//         if (!user) {
//           return null;
//         }

//         const isPasswordValid = await compare(
//           credentials.password,
//           user.password
//         );

//         if (!isPasswordValid) {
//           return null;
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           username: user.username,
//           role: user.role,
//           permissions: user?.permissions,
//         };
//       },
//     }),
//   ],

//   callbacks: {
//     async session({ session, token }) {
//       console.log("session token", token);
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id,
//           email: token.email,
//           username: token.username,
//           role: token.role,
//           permissions: token?.permissions,
//         },
//       };
//     },

//     async jwt({ token, user }: any) {
//       // after login jwt token and get the user data from here

//       if (user) {
//         return {
//           ...token,
//           id: user.id,
//           email: user.email,
//           username: user.username,
//           role: user.role,
//           permissions: user?.permissions,
//         };
//       }
//       return token;
//     },
//   },

//   pages: {
//     signIn: "/auth/login",
//   },

//   debug: process.env.NODE_ENV === "development",
//   jwt: {
//     secret: process.env.NEXTAUTH_JWT_SECRET,
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };
// function CredentialsProvider(arg0: {
//   name: string;
//   credentials: {
//     email: { label: string; type: string };
//     password: { label: string; type: string };
//   };
//   authorize(
//     credentials: any,
//     req: any
//   ): Promise<{
//     id: any;
//     email: any;
//     username: any;
//     role: any;
//     permissions: any;
//   } | null>;
// }): import("next-auth/providers/index").Provider {
//   throw new Error("Function not implemented.");
// }
