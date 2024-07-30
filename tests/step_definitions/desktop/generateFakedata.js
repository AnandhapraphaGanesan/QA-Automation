const faker = require('faker');
const ExcelJS = require('exceljs');

// Create a new workbook and a worksheet
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('FakeData');

// Define the columns
worksheet.columns = [
  { header: 'Name', key: 'name' },
  { header: 'Email', key: 'email' },
  { header: 'Address', key: 'address' },
  { header: 'Phone', key: 'phone' }
];

// Add rows with fake data
for (let i = 0; i < 10; i++) {
  worksheet.addRow({
    name: faker.name.findName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    phone: faker.phone.phoneNumber()
  });
}

// Write to Excel file
workbook.xlsx.writeFile('FakeData.xlsx')
  .then(() => {
    console.log('Data written to FakeData.xlsx');
  })
  .catch(err => {
    console.error('Error writing to Excel file', err);
  });
