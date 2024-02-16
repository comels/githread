import { getAuthSession } from "@/pages/api/auth/[...nextauth]";
import { postSelect } from "./post.query";
import { prisma } from "@/lib/prisma";

export const getUser = async () => {
  const session = await getAuthSession();

  if (!session?.user.id) {
    throw new Error("User not found");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
  });

  return user;
};

export const getUserById = async (paramsId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: paramsId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      bio: true,
      createdAt: true,
      link: true,
      _count: {
        select: {
          followers: true,
          likes: true,
        },
      },
      posts: {
        select: postSelect(paramsId),
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return user;
};

export const getUserEdit = async () => {
  const session = await getAuthSession();

  if (!session?.user.id) {
    throw new Error("User not found");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      bio: true,
      link: true,
    },
  });

  return user;
};
