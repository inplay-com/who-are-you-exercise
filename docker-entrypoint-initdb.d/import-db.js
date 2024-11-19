const { exec } = require("child_process");
const path = require("path");

const dumpFilePath = path.join("/initial-data", "staging.agz");
const mongoUri = "mongodb://root:password@localhost:27017/staging?authSource=admin";

console.log("Importing database...", dumpFilePath);
exec(`mongorestore --uri="${mongoUri}" --archive="${dumpFilePath}" --gzip`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error importing database: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout: ${stdout}`);
});
