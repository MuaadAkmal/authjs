"use server";

import { LoginSchema, RegisterSchema } from "@/schemas/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { getUserByEmail } from "@/lib/utils";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routeRule";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/verification-token";
import { sendTwoFactorTokenMail, sendVerificationEmail } from "@/lib/mail";
import { generateTwoFactorToken } from "@/lib/token";
import { getTwoFactorTokenByEmail } from "@/lib/two-factor-token";
import { getTwoFactorConfrimationByUserId } from "@/lib/two-factor-confirmation";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl: string
) => {
  const safeValues = LoginSchema.safeParse(values);
  if (!safeValues.success) {
    return { error: "Invalid email or password " };
  }
  const { email, password, code } = safeValues.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email doesn't exist" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Verification email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) return { error: "Invalid two factor token" };
      if (twoFactorToken.token !== code) {
        return { error: "Invalid two factor token" };
      }
      const hasExpired = new Date() > new Date(twoFactorToken.expires);
      if (hasExpired) {
        return { error: "Two factor token expired" };
      }

      await prisma.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfrimationByUserId(
        existingUser.id
      );
      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenMail(existingUser.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
  // TODO: remove this later
  return { success: "Login successful" };
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const safeValues = RegisterSchema.safeParse(values);
  if (!safeValues.success) {
    return { error: "Invalid email or password " };
  }
  const { email, password, name } = safeValues.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  console.log("Exisint User", existingUser);

  if (existingUser) {
    return { error: "User already exists" };
  }

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      switch (e.code) {
        case "P1001":
          return { error: "Failed to Connect to DB" };

        default:
          return { error: "Something went wrong" };
      }
    }
    return { error: "Something went wrong" };
  }

  return { success: "Verification Email sent" };
};
