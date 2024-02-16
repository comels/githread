"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "@/src/query/user.query";

export const createReply = async (postId, values) => {
  const user = await getUser();

  const post = await prisma.post.create({
    data: {
      content: values.content,
      userId: user.id,
      parentId: postId,
    },
  });

  return postId;
};
