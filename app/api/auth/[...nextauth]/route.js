import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // ... (unchanged)
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        try {
          const db = await connectToDB();
          const existingUser = await User.findOne({ email: credentials.email });

          if (existingUser) {
            // User already exists, check password
            if (existingUser.password === credentials.password) {
              return existingUser;
            } else {
              return null;
            }
          } else {
            // User doesn't exist, create a new user
            const newUser = await User.create({
              email: credentials.email,
              password: credentials.password,
            });
            return newUser;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },

      secret: process.env.NEXTAUTH_SECRET,
    }),
  ],
  session: {
    jwt: true,
  },
  pages: {
    signIn: "/login",
  },
};

const handler = (req, res) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
