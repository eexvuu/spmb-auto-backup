require("dotenv").config();
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const { format } = require("date-fns");
const { zonedTimeToUtc, utcToZonedTime } = require("date-fns-tz");

async function fetchSPMBData() {
    try {
        // Create backup directory if it doesn't exist
        const backupDir = path.join(
            __dirname,
            process.env.BACKUP_DIR || "backup"
        );
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir);
            console.log("Created backup directory");
        }

        const apiUrl = `${process.env.API_URL}?token=${process.env.API_TOKEN}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();
        console.log("Data fetched successfully");

        // Generate filename with formatted date in WIB timezone
        const timeZone = process.env.TIMEZONE || "Asia/Jakarta";
        const now = new Date();
        const formattedDate = format(now, "yyyy-MM-dd_HH-mm-ss");
        const filename = `spmb_backup_${formattedDate}_WIB.sql`;
        const filepath = path.join(backupDir, filename);

        // Save to file in backup directory
        fs.writeFileSync(filepath, data);
        console.log(`Data saved to ${filepath}`);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Schedule the backup using environment variable
cron.schedule(
    process.env.CRON_SCHEDULE || "0 */4 * * *",
    () => {
        const now = new Date();
        console.log(
            `Running scheduled backup at ${format(
                now,
                "yyyy-MM-dd HH:mm:ss"
            )} WIB`
        );
        fetchSPMBData();
    },
    {
        timezone: process.env.TIMEZONE || "Asia/Jakarta",
    }
);

// Start the service
console.log(
    "SPMB backup service started. Will run every 4 hours (00:00, 04:00, 08:00, 12:00, 16:00, 20:00 WIB)..."
);

// Keep the process running
process.on("SIGINT", () => {
    console.log("Stopping SPMB backup service...");
    process.exit();
});
