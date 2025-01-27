import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import { encrypt } from "./utils";
import { checkAuth } from "@/serverActions/eisnAction";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        empId: { label: "Employee ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        //runs on login
        if (!credentials?.empId || !credentials?.password) {
          throw new Error("Please enter both employee ID and password");
        }
        const empId = credentials.empId as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: {
            emp_id: empId,
          },
        });
        if (!user) {
          return null;
        }

        const isAuthorised = await checkAuth(empId, password);
        // console.log("isAuthorised", isAuthorised);
        if (!isAuthorised.success) {
          return null;
        }

        const hashedPassword = encrypt(password);
        const updatedUser = await prisma.user.update({
          where: {
            emp_id: empId,
          },
          data: { hashedPassword },
        });

        return updatedUser;
      },
    }),
  ],
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return "/app/dashboard";
    },
    authorized: ({ auth, request }) => {
      const istrying = request.nextUrl.pathname.includes("/app");
      const isLogged = !!auth?.user;
      if (!isLogged && istrying) {
        return false;
      }
      if (isLogged && istrying) {
        return true;
      }
      if (!istrying && !isLogged) {
        return true;
      }
      if (isLogged && !istrying) {
        return true;
      }
      return false;
    },
    jwt: ({ token, user }) => {
      if (user && user.id) {
        token.userId = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 5 * 60,
  },
});
