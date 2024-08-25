const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const kyle = await prisma.user.upsert({
    where: {
      username: "kyle",
    },
    update: {},
    create: {
      username: "kyle",
      password: "password",
      email: "kyle@example.com",
      role: "MEMBER",
      posts: {
        create: {
          title: "My first post",
          content: "Lorem ipsum dolor sit amet.",
        }
      }
    }
  })

  const bob = await prisma.user.upsert({
    where: {
      username: "bob",
    },
    update: {},
    create: {
      username: "bob",
      password: "password",
      email: "bob@example.com",
      role: "MEMBER",
      posts: {
        create: {
          title: "My first post",
          content: "Pellentesque pulvinar quam ut porttitor.",
          comments: {
            create: {
              content: "Vestibulum euismod est nunc, quis iaculis felis sodales et.",
              authorId: kyle.id,
            }
          },
        }
      }
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })