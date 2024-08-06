const { faker } = require('@faker-js/faker');
const XLSX = require('xlsx');
const fs = require('fs');

// Define the number of records you want to generate
const numberOfRecords = 1;

const fakeData = [];

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
    departureDate: formattedDepartureDate,
  });
}

// Create a new workbook and add a worksheet with the fake data
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(fakeData);
XLSX.utils.book_append_sheet(workbook, worksheet, 'FakeData');

// Write the workbook to a file
const filePath = 'C:/Users/User/Desktop/CreateReservation.xlsx';
XLSX.writeFile(workbook, filePath);

console.log(`Data has been written to ${filePath}`);

// Load the workbook and read data from 'FakeData' sheet
const loadedWorkbook = XLSX.readFile(filePath);
const fakeDataSheet = loadedWorkbook.Sheets['FakeData'];
const fakeDataJson = XLSX.utils.sheet_to_json(fakeDataSheet);
console.log('FakeData:', fakeDataJson); // Debugging line

// Create a new worksheet for 'NewData' if it doesn't exist
let newDataSheet = loadedWorkbook.Sheets['NewData'];
if (!newDataSheet) {
  newDataSheet = XLSX.utils.aoa_to_sheet([[]]); // Ensure an empty row is created
  XLSX.utils.book_append_sheet(loadedWorkbook, newDataSheet, 'NewData');
}

// Define the column mappings
const columnMappings = {
  startDate: 'G',
  endDate: 'H',
  arrivalDate: 'I',
  departureDate: 'J'
};

// Append the fake data to the 'NewData' sheet in the specified columns
fakeDataJson.forEach((row, index) => {
  const rowIndex = index + 2; // Start from the second row to leave the header row
  Object.keys(columnMappings).forEach((key) => {
    const cellAddress = `${columnMappings[key]}${rowIndex}`;
    newDataSheet[cellAddress] = { t: 's', v: row[key] };
    console.log(`Writing ${row[key]} to ${cellAddress}`);
  });
});

// Ensure the newDataSheet is properly added to the workbook
loadedWorkbook.Sheets['NewData'] = newDataSheet;

// Write the updated workbook to the file
XLSX.writeFile(loadedWorkbook, filePath);

console.log(`Data has been imported from 'FakeData' to specific columns in 'NewData' in ${filePath}`);
console.log('Contents of newDataSheet:', newDataSheet);

