const { faker } = require('@faker-js/faker');
const XLSX = require('xlsx');
const fs = require('fs');

// Define the number of records you want to generate
const numberOfRecords = 3;

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
    depatureD: formattedDepartureDate,
    numberOfRooms: faker.datatype.number({ min: 1, max: 2 }),
    adults: faker.datatype.number({ min: 1, max: 2 }),
    children: faker.datatype.number({ min: 0, max: 2 }),
    limit: faker.datatype.number({ min: 1, max: 3 }),
    roomStayQuantity: faker.datatype.number({ min: 1, max: 2 }),
  });
}

// Load the existing workbook if it exists
const filePath = 'C:/Users/User/Desktop/CreateReservation.xlsx';
let workbook;

if (fs.existsSync(filePath)) {
  workbook = XLSX.readFile(filePath);
} else {
  workbook = XLSX.utils.book_new();
}

// Create a new worksheet with the fake data
const newWorksheet = XLSX.utils.json_to_sheet(fakeData);
const newSheetName = 'NewData'; // Name of the new sheet

// Append the new worksheet to the workbook
XLSX.utils.book_append_sheet(workbook, newWorksheet, newSheetName);

// Write the updated workbook to a file
XLSX.writeFile(workbook, filePath);

console.log(`Data has been written to ${filePath}`);
