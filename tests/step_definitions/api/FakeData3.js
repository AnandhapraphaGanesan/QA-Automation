const { faker } = require('@faker-js/faker');
const XLSX = require('xlsx');
const fs = require('fs');

// Define the number of records you want to generate
const numberOfRecords = 2;

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

// Check if the file exists
let workbook;
if (fs.existsSync(filePath)) {
  // Read the existing workbook
  workbook = XLSX.readFile(filePath);
} else {
  // Create a new workbook
  workbook = XLSX.utils.book_new();
}

// Add a worksheet with the fake data
const fakeDataWorksheet = XLSX.utils.json_to_sheet(fakeData);
XLSX.utils.book_append_sheet(workbook, fakeDataWorksheet, 'FakeData');

// Write the workbook with "FakeData" sheet to the file
XLSX.writeFile(workbook, filePath);

console.log(`"FakeData" has been written to ${filePath}`);

// Now, read the data from the 'FakeData' sheet and copy it to a new sheet 'ProcessedData' in the same workbook

// Extract data from the "FakeData" sheet
const existingWorksheet = workbook.Sheets['FakeData'];
const existingData = XLSX.utils.sheet_to_json(existingWorksheet);

// Optionally, process the data (for example, filter or transform)
const processedData = existingData.map(record => {
  // Example transformation: add a new field or modify existing fields
  return {
    ...record,
    processedField: 'Processed', // Add a new field for demonstration
  };
});

// Add a new worksheet with the processed data
const processedDataWorksheet = XLSX.utils.json_to_sheet(processedData);
XLSX.utils.book_append_sheet(workbook, processedDataWorksheet, 'ProcessedData');

// Write the workbook with both sheets to the file
XLSX.writeFile(workbook, filePath);

console.log(`"ProcessedData" has been added to ${filePath}`);
