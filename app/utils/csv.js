const fs = require("fs");

const csvFilePath = "db.csv";

const checkForCsvFile = () => {
  const csvContent = "id,first_name,last_name,email,age,date_of_birth\n";
  if (!fs.existsSync(csvFilePath)) {
    // If the file doesn't exist, create an empty one
    fs.writeFileSync(csvFilePath, csvContent);
    return [];
  }
};

const readCSV = () => {
  checkForCsvFile();
  const csvData = fs.readFileSync(csvFilePath, "utf-8");
  const lines = csvData.split("\n");
  const headers = lines[0].split(",");
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] !== "") {
      const values = lines[i].split(",");
      const entry = {};
      for (let j = 0; j < headers.length; j++) {
        entry[headers[j]] = values[j];
      }
      data.push(entry);
    }
  }
  return data;
};

const writeCSV = (data) => {
  let csvContent = "id,first_name,last_name,email,age,date_of_birth\n";
  data.forEach((entry) => {
    csvContent += `${entry.id},${entry.first_name},${entry.last_name},${entry.email},${entry.age},${entry.date_of_birth}\n`;
  });
  fs.writeFileSync(csvFilePath, csvContent);
};

module.exports = {
  readCSV,
  writeCSV,
};
