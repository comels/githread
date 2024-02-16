"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deletePost = async (postId) => {
  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  console.log("Post deleted");
  revalidatePath("/");
};
