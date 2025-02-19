import cron from "node-cron";
import { resetDayCounters, resetWeekCounters } from "./resetFunctions.js";

console.log(`* Cron scheduler is now running. *
The system will now reset the daily and weekly timers of each clock appropriately.`);

// Schedule cron resets for every day at midnight
cron.schedule("0 0 * * *", async () => {
    console.log("It's midnight, resetting all daily time statistics");
    await resetDayCounters()
    .then((res) => console.log("Successfully reset " + res.count + " clocks"))
    .catch((err) => console.log(err));
});

// Schedule cron resets for every week at midnight on Sunday
cron.schedule("0 0 * * 0", async () => {
    console.log("It's midnight, resetting all daily time statistics");
    await resetDayCounters()
    .then((res) => console.log("Successfully reset " + res.count + " clocks"))
    .catch((err) => console.log(err));
});