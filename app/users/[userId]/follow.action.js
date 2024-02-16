"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "@/src/query/user.query";
import { revalidatePath } from "next/cache";

export const followUser = async (userId) => {
  const user = await getUser(userId);

  const isFollowing = await prisma.follow.findFirst({
    where: {
      followerId: userId,
      followingId: user.id,
    },
    select: {
      id: true,
    },
  });

  if (isFollowing) {
    await prisma.follow.delete({
      where: {
        id: isFollowing.id,
      },
    });
  } else {
    await prisma.follow.create({
      data: {
        followerId: userId,
        followingId: user.id,
      },
    });
  }

  revalidatePath(`/users/${userId}`);
};
