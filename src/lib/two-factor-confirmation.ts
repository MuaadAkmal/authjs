import prisma from "./db";

export const getTwoFactorConfrimationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique(
      {
        where: {
          userId,
        },
      }
    );
    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
