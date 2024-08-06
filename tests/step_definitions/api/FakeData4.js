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

// Convert source worksheet to JSON
const fakeData = XLSX.utils.sheet_to_json(sourceWorksheet);

// Prepare new data structure for target columns
const targetData = fakeData.map(row => ({
  'G': row['startDate'],
  'H': row['endDate'],
  'I': row['arrivalDate'],
  'J': row['departureDate']
}));


// Load or create the target workbook
let targetWorkbook;
if (fs.existsSync(targetFilePath)) {
  targetWorkbook = XLSX.readFile(targetFilePath);
} else {
  targetWorkbook = XLSX.utils.book_new();
}

// Overwrite the existing sheet or create a new sheet with the extracted data
const newSheetName = 'ImportedData'; // Name of the sheet in the target workbook
const newWorksheet = XLSX.utils.json_to_sheet(fakeData);

// Remove the existing sheet if it exists
if (targetWorkbook.SheetNames.includes(newSheetName)) {
  delete targetWorkbook.Sheets[newSheetName];
  const sheetIndex = targetWorkbook.SheetNames.indexOf(newSheetName);
  targetWorkbook.SheetNames.splice(sheetIndex, 1);
}

// Append the new sheet with the updated data
XLSX.utils.book_append_sheet(targetWorkbook, newWorksheet, newSheetName);

// Write the updated target workbook to a file
XLSX.writeFile(targetWorkbook, targetFilePath);

console.log(`Data from "${sourceFilePath}" has replaced existing data in "${targetFilePath}" under the sheet name "${newSheetName}".`);
