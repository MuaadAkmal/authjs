import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import authConfig from "./auth.config";
import { getUserById } from "./lib/utils";
import prisma from "./lib/db";
import { getTwoFactorConfrimationByUserId } from "./lib/two-factor-confirmation";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    linkAccount: async ({ user }) => {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      // allow OAuth without Email verification
      if (account?.provider !== "credentials") return true;

      if (!user.id) return false;
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) {
        return false;
      }
      // TODO: Add 2FA here
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfimation = await getTwoFactorConfrimationByUserId(
          existingUser.id
        );
        if (!twoFactorConfimation) {
          return false;
        }
        // Delete 2FA confirmation after Login
        await prisma.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfimation.id,
          },
        });
      }

      return true;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;
      const exisingUser = await getUserById(token.sub);
      if (!exisingUser) return token;
      token.role = exisingUser.role;
      return token;
    },
    session: async ({ session, token }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
