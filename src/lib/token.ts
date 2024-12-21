import prisma from "./db";
import crypto from "crypto";
import { getTwoFactorTokenByEmail } from "./two-factor-token";

export function getVerificationTokenByEmail(email: string) {
  try {
    return prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });
  } catch {
    return null;
  }
}

export function getVerificationTokenByToken(token: string) {
  try {
    return prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });
  } catch {
    return null;
  }
}

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 999_999).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
