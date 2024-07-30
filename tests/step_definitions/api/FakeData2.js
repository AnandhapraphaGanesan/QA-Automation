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

// Create a new workbook and add a worksheet with the fake data
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(fakeData);
XLSX.utils.book_append_sheet(workbook, worksheet, 'FakeData');

// Define the file path for the initial workbook
const filePath = 'C:/Users/User/Desktop/CreateReservation.xlsx';

// Write the workbook to a file
XLSX.writeFile(workbook, filePath);

console.log(`Data has been written to ${filePath}`);

// Now, read the data from the 'FakeData' sheet and copy it to a new sheet 'ProcessedData' in a new workbook

// Read the existing Excel file
const existingWorkbook = XLSX.readFile(filePath);
const existingWorksheet = existingWorkbook.Sheets['FakeData'];
const existingData = XLSX.utils.sheet_to_json(existingWorksheet);

// Define the new sheet name and file path for the new workbook
const newSheetName = 'ProcessedData';
const newFilePath = 'C:/Users/User/Desktop/ProcessedData.xlsx';

// Create a new workbook and add a worksheet with the processed data
const newWorkbook = XLSX.utils.book_new();
const newWorksheet = XLSX.utils.json_to_sheet(existingData);
XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, newSheetName);

// Write the new workbook to a file
XLSX.writeFile(newWorkbook, newFilePath);

console.log(`Data has been copied to ${newFilePath}`);
