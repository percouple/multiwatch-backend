import { PrismaClient } from "@prisma/client";

export default async function authenticateUser(userId) {
  const prisma = new PrismaClient();

  async function main() {
    const clock = await prisma.clocks.create({
      data: {
        name: "New Clock",
        userId: userId,
        editing: false,
        lastSessionTime: 0,
        todaySessionTime: 0,
        thisWeekTime: 0,
        allTime: 0,
      },
    });

    return clock;
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
