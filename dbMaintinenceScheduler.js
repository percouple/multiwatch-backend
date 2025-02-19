import cron from "node-cron";
import { resetDayCounters, resetWeekCounters } from "./resetFunctions.js";

console.log(`* Cron scheduler is now running. *
The system will now reset the daily and weekly timers of each clock appropriately.`);

// Schedule cron resets for every day at midnight
cron.schedule("* * * * *", async () => {
  console.log("Resetting");
    await resetDayCounters()
    .then((res) => console.log("Successfully reset " + res.count + " clocks"))
    .catch((err) => console.log(err));

});
