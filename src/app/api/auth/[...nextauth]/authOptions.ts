import PATH from "@/app/_constants/PATH";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { axiosInstance } from "../../../../../config/axios";

declare module "next-auth" {
  interface Session {
    user: User;
    token?: string; // You could also add the token to the session
  }
  interface User {
    role: string;
    name: string;
    email: string;
    accessToken: string;
    id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: "Ov23liDAoSCCUsbkikJ0",
      clientSecret: "48cb4d060f92715f3adde5365a1aad619303451d",
    }),
    GoogleProvider({
      clientId:
        "199033744051-c02pd4mtskirqcgvfogpehdsgmjik2np.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const user: {
            id: string;
            username: string;
            role: string;
            accessToken: string;
          } = await axiosInstance.post(PATH.LOGIN, {
            username: credentials?.username,
            password: credentials?.password,
          });

          return {
            name: user.username,
            email: user.username,
            role: user.role,
            accessToken: user.accessToken,
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: "secretKey",
  callbacks: {
    async signIn() {
      return true;
    },

    async jwt({ token, account, user }) {
      if (account && account.provider.toLocaleUpperCase() == "CREDENTIALS") {
        token.accessToken = user.accessToken;
        token.role = user.role;
      } else if (account && user) {
        const userInfo: {
          id: number;
          username: string;
          role: string;
          accessToken: string;
        } = await axiosInstance.post(PATH.LOGIN, {
          username: user?.email,
          provider: account?.provider.toLocaleUpperCase(),
        });

        token.accessToken = userInfo.accessToken;
        token.role = userInfo.role;
      }

      return token;
    },

    async session({ session, token }) {
      session.token = token?.accessToken as string;
      session.user.role = token.role as string;
      return session;
    },

    async redirect({ baseUrl }) {
      return baseUrl + "/products";
    },
  },
};
