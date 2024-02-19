"use server";

import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/pages/api/auth/[...nextauth]";
import { getUser } from "@/src/query/user.query";

export const editProfile = async (values) => {
  const session = await getAuthSession();

  if (!session?.user.id) {
    throw new Error("Session from edit not found");
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: values
  });

  return '/profile';
};
