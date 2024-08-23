const { faker } = require('@faker-js/faker');
const XLSX = require('xlsx');
const fs = require('fs');

// Define the number of records you want to generate
const numberOfRecords = 10;

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
    // numberOfRooms: faker.datatype.number({ min: 1, max: 2 }),
    // adults: faker.datatype.number({ min: 1, max: 2 }),
    // children: faker.datatype.number({ min: 0, max: 2 }),
    // limit: faker.datatype.number({ min: 1, max: 3 }),
    // roomStayQuantity: faker.datatype.number({ min: 1, max: 2 }),
  });
}

// Create a new workbook and add a worksheet with the fake data
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(fakeData);
XLSX.utils.book_append_sheet(workbook, worksheet, 'FakeData');

// Write the workbook to a file
const filePath = 'C:/Users/User/Desktop/CreateReservation.xlsx';
const sheetName = 'FakeData'; // Ensure this matches your sheet name
XLSX.writeFile(workbook, filePath);

console.log(`Data has been written to ${filePath}`);
