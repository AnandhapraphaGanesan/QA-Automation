const { faker } = require('@faker-js/faker');

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
    // request: faker.internet.url(),
    // Authendpa: faker.internet.url(),
    // Postendpa: faker.internet.url(),
    // Getendpat: faker.internet.url(),
    // hotelId: faker.random.alpha({ count: 5, upcase: true }),
    startDate: formattedArrivalDate,
    endDate: formattedArrivalDate,
    arrivalDate: formattedArrivalDate,
    depatureD: formattedDepartureDate,
    // roomType: faker.random.alpha({ count: 4, upcase: true }),
    // ratePlanCod: faker.random.alpha({ count: 5, upcase: true }),
    // marketCod: faker.random.alpha({ count: 1, upcase: true }),
    // sourceCod: faker.random.alpha({ count: 2, upcase: true }),
    numberOfRooms: faker.datatype.number({ min: 1, max: 2 }),
    // roomTypeChar: faker.random.alpha({ count: 4, upcase: true }),
    adults: faker.datatype.number({ min: 1, max: 2 }),
    children: faker.datatype.number({ min: 0, max: 2 }),
    limit: faker.datatype.number({ min: 1, max: 3}),
    roomStayQuantity: faker.datatype.number({ min: 1, max: 2}),
    // guaranteeTyp: faker.random.alpha({ count: 3, upcase: true }),
  });
}

console.log(fakeData);
