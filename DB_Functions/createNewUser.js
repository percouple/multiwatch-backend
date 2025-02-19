import { PrismaClient } from "@prisma/client";

export default async function createNewUser(username, password) {
  const prisma = new PrismaClient();

  async function main() {

    // Check for unique username
    const alreadyExists = await prisma.users.findFirst({
      where: {
        username: username,
      }
    })

    // Exit if it already exists
    if (alreadyExists) {
      return null;
    }
    
    // Create the user
    const user = await prisma.users.create({
      data: {
        username: username,
        password: password,
      },
    });

    return user
  }

  return main()
    .then(async (result) => {
      await prisma.$disconnect();
      return result;
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
