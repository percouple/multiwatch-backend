import { Prisma, PrismaClient } from "@prisma/client";

// Goes through clocks database and resets day counters on clocks
export const resetDayCounters = async () => {
  const prisma = new PrismaClient();
  async function main() {
    console.log('thru')
    const result = await prisma.clocks.updateMany({ 
        where: {}, 
        data: { todaySessionTime: 0 } });

    console.log(result)
  }

  try {
    console.log("Resetting daily times in database");
    const result = await main();
    await prisma.$disconnect;
    console.log("Daily timers successfully reset");
    return result;
  } catch (error) {
    // Handle any errors
    console.error("Error occurred: " + error);
    // Disconnect Prisma Client on error
    await prisma.$disconnect();
    // You can throw or return a custom error message here
    throw new Error("Daily timers not successfully reset"); // You can choose to return or throw
  }
};

// Goes through clocks database and resets week counters on clocks
export const resetWeekCounters = async () => {
    const prisma = new PrismaClient();
  async function main() {
    const result = await prisma.clocks.updateMany({ 
        where: {}, 
        data: { thisWeekTime: 0 }});
    console.log(result)
  }

  try {
    console.log("Resetting weekly times in database");
    const result = await main();
    await prisma.$disconnect;
    console.log("Weekly timers successfully reset");
    return result;
  } catch (error) {
    // Handle any errors
    console.error("Error occurred: " + error);
    // Disconnect Prisma Client on error
    await prisma.$disconnect();
    // You can throw or return a custom error message here
    throw new Error("Weekly timers not successfully reset"); // You can choose to return or throw
  }
};
