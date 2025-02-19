import { Prisma, PrismaClient } from "@prisma/client";

// Goes through clocks database and resets day counters on clocks
export const resetDayCounters = async () => {
    const prisma = new PrismaClient()
    async function main () {
        prisma.clocks.updateMany({
            data: {todaySessionTime: 0}
        })
    }

    try {
        console.log("Resetting daily times in database");
        const result = await main()
        await prisma.$disconnect;
        console.log("Daily timers successfully reset")
        return result;
    } catch {
        // Handle any errors
        console.error("Error occurred:", e);
        // Disconnect Prisma Client on error
        await prisma.$disconnect();
        // You can throw or return a custom error message here
        throw new Error("Daily timers not successfully reset"); // You can choose to return or throw
    }
}

// Goes through clocks database and resets week counters on clocks
export const resetWeekCounters = () => {

}