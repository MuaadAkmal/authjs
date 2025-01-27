type Update = { userId: number; dob: Date };
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

const prisma = new PrismaClient();

async function main() {
  const csvFilePath = path.resolve(__dirname, "employees.csv"); // Update this with the actual path to your CSV file
  const updates: Update[] = [];

  // Parse the CSV file
  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on("data", (row) => {
      const userId = parseInt(row["User ID"], 10);
      const [day, month] = row["Bday"].split("/"); // Extract MM and DD
      const dob = new Date(`2000-${month}-${day}`); // Assign a placeholder year (e.g., 2000)

      updates.push({ userId, dob });
    })
    .on("end", async () => {
      console.log("CSV file successfully processed");

      // Update the database
      for (const update of updates) {
        const { userId, dob } = update;
        try {
          await prisma.user.update({
            where: { emp_id: userId.toString() },
            data: { dob },
          });
          console.log(`Updated userId: ${userId} with dob: ${dob}`);
        } catch {
          console.error(`Failed to update userId: ${userId}`);
        }
      }

      console.log("Database update complete");
      await prisma.$disconnect();
    });
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
