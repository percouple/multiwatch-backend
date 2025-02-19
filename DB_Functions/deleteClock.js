import { PrismaClient } from "@prisma/client";

export default async function deleteClock(clockId) {
  const prisma = new PrismaClient();

  async function main() {
    const res = await prisma.clocks.delete({
      where: {
        id: clockId
      }
    });

    return res;
  }

  try {
    // Call the main function and return the result
    const result = await main();

    // Disconnect Prisma Client after the operation
    await prisma.$disconnect();

    // Return the result of the authentication
    return result;
  } catch (e) {
    // Handle any errors
    console.error("Error occurred:", e);

    // Disconnect Prisma Client on error
    await prisma.$disconnect();

    // You can throw or return a custom error message here
    throw new Error("Authentication failed"); // You can choose to return or throw
  }
}
