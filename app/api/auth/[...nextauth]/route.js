import NextAuth from "next-auth/next";
import { CredentialsProvider } from "next-auth/providers";
import { connectTodDB } from "@/utils/database";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credential: {
        email: { label: "Email", placeholder: "Enter the Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        const db = await connectTodDB();
        const user = await db.collection("users").findOne({ email });
        if (user) {
          if (user.password === credentials.password) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = (req, res) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
