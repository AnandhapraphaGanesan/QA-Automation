const XLSX = require('xlsx');
const fs = require('fs');

// Paths to the source and target Excel files
const sourceFilePath = 'C:/Users/User/Desktop/CreateReservation.xlsx';
const targetFilePath = 'C:/Users/User/Desktop/TargetReservation.xlsx';

// Load the source workbook and extract data from the "FakeData" sheet
const sourceWorkbook = XLSX.readFile(sourceFilePath);
const sourceSheetName = 'FakeData'; // The name of the sheet containing the fake data
const sourceWorksheet = sourceWorkbook.Sheets[sourceSheetName];
if (!sourceWorksheet) {
  console.error(`Sheet not found: ${sourceSheetName}`);
  process.exit(1);
}

const fakeData = XLSX.utils.sheet_to_json(sourceWorksheet);

// Load or create the target workbook
let targetWorkbook;
if (fs.existsSync(targetFilePath)) {
  targetWorkbook = XLSX.readFile(targetFilePath);
} else {
  targetWorkbook = XLSX.utils.book_new();
}

// Create a new sheet with the extracted data in the target workbook
const newSheetName = 'ImportedData'; // Name of the new sheet in the target workbook
const newWorksheet = XLSX.utils.json_to_sheet(fakeData);
XLSX.utils.book_append_sheet(targetWorkbook, newWorksheet, newSheetName);

// Write the updated target workbook to a file
XLSX.writeFile(targetWorkbook, targetFilePath);

console.log(`Data has been imported from "${sourceFilePath}" and written to "${newSheetName}" in ${targetFilePath}`);
