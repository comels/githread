"use server";

import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/pages/api/auth/[...nextauth]";
import { revalidatePath } from "next/cache";

export const likeAction = async (postId) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return;
  }

  const isLiked = await prisma.like.findFirst({
    where: {
      postId,
      userId: session.user.id,
    },
  });

  if (isLiked) {
    await prisma.like.delete({
      where: {
        id: isLiked.id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        postId,
        userId: session.user.id,
      },
    });
  }

  revalidatePath("/");
  revalidatePath(`/posts/${postId}`);
};
