const { faker } = require('@faker-js/faker');
const XLSX = require('xlsx');
const fs = require('fs');

// Define the number of records you want to generate
const numberOfRecords = 10;

// Array to hold the fake data
const fakeData = [];

// Generate fake data
for (let i = 0; i < numberOfRecords; i++) {
  const arrivalDate = faker.date.future();
  const formattedArrivalDate = arrivalDate.toISOString().split('T')[0];
  const departureDate = new Date(arrivalDate);
  departureDate.setDate(arrivalDate.getDate() + 1);
  const formattedDepartureDate = departureDate.toISOString().split('T')[0];

  fakeData.push({
    startDate: formattedArrivalDate,
    endDate: formattedArrivalDate,
    arrivalDate: formattedArrivalDate,
    depatureD: formattedDepartureDate,
    numberOfRooms: faker.datatype.number({ min: 1, max: 2 }),
    adults: faker.datatype.number({ min: 1, max: 2 }),
    children: faker.datatype.number({ min: 0, max: 2 }),
    limit: faker.datatype.number({ min: 1, max: 3 }),
    roomStayQuantity: faker.datatype.number({ min: 1, max: 2 }),
  });
}

// Define the file path for the workbook
const filePath = 'C:/Users/User/Desktop/CreateReservation.xlsx';
const indexFilePath = 'C:/Users/User/Desktop/last_processed_index.txt';

// Check if the file exists
let workbook;
if (fs.existsSync(filePath)) {
  // Read the existing workbook
  workbook = XLSX.readFile(filePath);
} else {
  // Create a new workbook
  workbook = XLSX.utils.book_new();
}

// Add or update the "FakeData" sheet
const fakeDataWorksheet = XLSX.utils.json_to_sheet(fakeData);
XLSX.utils.book_append_sheet(workbook, fakeDataWorksheet, 'FakeData');

// Write the workbook with "FakeData" sheet to the file
XLSX.writeFile(workbook, filePath);

console.log(`"FakeData" has been written to ${filePath}`);

// Read the last processed index
let lastProcessedIndex = 0;
if (fs.existsSync(indexFilePath)) {
  lastProcessedIndex = parseInt(fs.readFileSync(indexFilePath, 'utf-8'), 10);
} else {
  fs.writeFileSync(indexFilePath, lastProcessedIndex.toString(), 'utf-8');
}

// Extract data from the "FakeData" sheet
const existingWorksheet = workbook.Sheets['FakeData'];
const existingData = XLSX.utils.sheet_to_json(existingWorksheet);

// Process the next record if available
if (lastProcessedIndex < existingData.length) {
  const recordToProcess = existingData[lastProcessedIndex];
  const processedData = [recordToProcess]; // Array with the single record to be processed

  // Check if "ProcessedData" sheet exists, otherwise create it
  let processedDataWorksheet;
  if (workbook.Sheets['ProcessedData']) {
    processedDataWorksheet = workbook.Sheets['ProcessedData'];
  } else {
    processedDataWorksheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.book_append_sheet(workbook, processedDataWorksheet, 'ProcessedData');
  }

  // Append the processed record to the "ProcessedData" sheet
  const processedDataArray = XLSX.utils.sheet_to_json(processedDataWorksheet);
  processedDataArray.push(...processedData);
  const updatedProcessedDataWorksheet = XLSX.utils.json_to_sheet(processedDataArray);
  workbook.Sheets['ProcessedData'] = updatedProcessedDataWorksheet;

  // Write the updated workbook to the file
  XLSX.writeFile(workbook, filePath);

  // Update the last processed index
  lastProcessedIndex++;
  fs.writeFileSync(indexFilePath, lastProcessedIndex.toString(), 'utf-8');

  console.log(`Processed record ${lastProcessedIndex} has been added to "ProcessedData"`);
} else {
  console.log('All records have been processed.');
}
