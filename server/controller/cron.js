import cron from "node-cron";

function logMessage() {
  console.log("Cron job executed at:", new Date().toLocaleString());
}

function logMessage2() {
  console.log("One am Cron job executed at:", new Date().toLocaleString());
}

export function startCronJob() {
  cron.schedule("* * * * *", () => {
    logMessage();
  });

  cron.schedule("0 1 * * *", () => {
    logMessage2();
  });
}
