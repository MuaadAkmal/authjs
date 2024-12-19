import prisma from "./db";

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
