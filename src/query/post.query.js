import { prisma } from "@/lib/prisma";

export const postSelect = (userId) => ({
  id: true,
  content: true,
  createdAt: true,
  user: {
    select: {
      username: true,
      name: true,
      image: true,
      id: true,
    },
  },
  like: {
    select: {
      userId: true,
    },
    where: {
      userId: userId ?? "error",
    },
  },
  _count: {
    select: {
      like: true,
      replies: true,
    },
  },
});

export const getLatestPosts = (userId) =>
  prisma.post.findMany({
    where: {
      parentId: null,
    },
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
    select: postSelect(userId),
  });

export const getPost = (id, userId) =>
  prisma.post.findUnique({
    where: {
      id: id,
    },
    select: {
      ...postSelect(userId),
      replies: {
        select: postSelect(userId),
      },
      parent: {
        select: postSelect(userId),
      },
    },
  });

export const getPostReply = (id, userId) =>
  prisma.post.findUnique({
    where: {
      id: id,
    },
    select: {
      ...postSelect(userId),
    },
  });
