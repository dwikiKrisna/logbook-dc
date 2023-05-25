import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { username, password } = credentials;

        const user = {
          username: process.env.ADMIN_USERNAME,
          password: process.env.ADMIN_PASSWORD,
        };

        if (!username || !password) {
          throw new Error("Missing username or password");
        }

        if (username !== user.username) {
          throw new Error("No user found with that username");
        }

        if (password !== user.password) {
          throw new Error("Invalid password");
        }

        return {
          id: 1,
          name: "Admin"
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
