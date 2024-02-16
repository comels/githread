import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const main = async () => {
  const users = [];
  const posts = [];
  const likes = [];

  // Création des utilisateurs
  for (let i = 0; i < 30; i++) {
    const user = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      image: faker.image.avatar(),
      bio: faker.person.bio(),
      link: faker.internet.url(),
    };

    const createdUser = await prisma.user.create({
      data: user,
    });

    users.push(createdUser);
  }

  // Création des posts
  for (let i = 0; i < 50; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];

    const post = {
      content: faker.lorem.paragraphs(2),
      userId: randomUser.id,
    };

    const createdPost = await prisma.post.create({
      data: post,
    });

    posts.push(createdPost);
  }

  // Création des likes
  for (let i = 0; i < 1000; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];

    const like = {
      postId: posts[Math.floor(Math.random() * posts.length)].id,
      userId: randomUser.id,
    };

    const createdLike = await prisma.like.create({
      data: like,
    });

    likes.push(createdLike);
  }
};

main()
  .then(async () => {
    console.log("Database seeded");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
