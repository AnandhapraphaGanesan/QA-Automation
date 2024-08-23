const fs = require('fs');
const XLSX = require('xlsx');
const { faker } = require('@faker-js/faker');
const supertest = require('supertest');

// Define the number of records you want to generate
const numberOfRecords = 2;
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
console.log(fakeData);

// Create a new workbook and add a worksheet with the fake data
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(fakeData); // Use fakeDataArray here
XLSX.utils.book_append_sheet(workbook, worksheet, 'FakeData');

// Write the workbook to a file
const filePath = 'C:/Users/User/Desktop/CreateReservation.xlsx';
XLSX.writeFile(workbook, filePath);

console.log(`Data has been written to ${filePath}`);

// Read the Excel file to get the dates
const readWorkbook = XLSX.readFile(filePath);
const readWorksheet = readWorkbook.Sheets['FakeData'];
const excelData = XLSX.utils.sheet_to_json(readWorksheet);

let authToken;
let reservationId;
let confirmationId;
let externalReferenceId;

// Directly specify the absolute path
const jsonFilePath = 'C:/Users/User/Desktop/NewJson.json';
// Load the JSON data from the file
const testData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
console.log(testData);

     before(async function () {
    // Authenticate and set authToken before running tests 
    const reservation = testData.reservation;      
            await supertest(reservation.request)
                .post(reservation.Authendpath)
                .set('Content-Type', reservation['Content-Type'])
                .set('x-app-key', reservation['x-app-key'])
                .set('Authorization', reservation.Authorization)
                .send({
                    username: reservation.username,
                    password: reservation.password,
                    grant_type: 'password'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .then(function (response) {
                    authToken = response._body.access_token;
                    // console.log(response);
                });
        });

        // Iterate through each record in the Excel file
        excelData.forEach((record, index) => {
        describe('API Auth Token', function () {
        const reservation = testData.reservation;
        it('POST Create Reservation', async function ({ supertest }) {
            await supertest
                .request(reservation.request)
                .post(reservation.Postendpath)
                .set('Content-Type', reservation['Content-Type1'])
                .set('x-hotelid', reservation.hotelId)
                .set('x-app-key', reservation['x-app-key1'])
                .set('bypass-routing', reservation['bypass-routing'])
                .set('Authorization', 'Bearer ' + authToken)
                .send({
                    "reservations": [
                        {
                            "reservation": {
                                "roomStay": {
                                    "roomRates": [
                                        {
                                            "rates": [
                                                {
                                                    "rate": {
                                                        "base": {
                                                            "amountBeforeTax": 299,
                                                            "baseAmount": 299
                                                        },
                                                        "start": record.startDate,
                                                        "end": record.endDate
                                                    }
                                                }
                                            ],
                                            "stayProfiles": [
                                                { "reservationProfileType": "Company" },
                                                { "reservationProfileType": "Group" },
                                                { "reservationProfileType": "TravelAgent" },
                                                { "reservationProfileType": "ReservationContact" },
                                                { "reservationProfileType": "BillingContact" },
                                                { "reservationProfileType": "Source" }
                                            ],
                                            "guestCounts": {
                                                "adults": reservation.adults,
                                                "children": reservation.children
                                            },
                                            "roomType": reservation.roomType,
                                            "ratePlanCode": reservation.ratePlanCode,
                                            "marketCode": reservation.marketCode,
                                            "sourceCode": reservation.sourceCode,
                                            "numberOfUnits": reservation.numberOfUnits,
                                            "pseudoRoom": false,
                                            "roomTypeCharged": reservation.roomTypeCharged,
                                            "start": record.startDate,
                                            "end": record.endDate
                                        }
                                    ],
                                    "guestCounts": {
                                        "adults": reservation.adults,
                                        "children": reservation.children
                                    },
                                    "expectedTimes": {
                                        "reservationExpectedArrivalTime": record.arrivalDate,
                                        "reservationExpectedDepartureTime": record.departureDate
                                    },
                                    "guarantee": {
                                        "guaranteeCode": reservation.guaranteeCode,
                                        "onHold": false
                                    },
                                    "arrivalDate": record.arrivalDate,
                                    "departureDate": record.departureDate
                                },
                                "reservationGuests": {
                                    "profileInfo": {
                                        "profileIdList": {
                                            "type": "Profile",
                                            "id": reservation.profileId
                                        },
                                        "profile": {
                                            "customer": {
                                                "personName": [
                                                    {
                                                        "givenName": reservation.givenName,
                                                        "surname": reservation.lastName,
                                                        "nameType": "Primary"
                                                    },
                                                    { "nameType": "Alternate" }
                                                ]
                                            },
                                            "addresses": {
                                                "addressInfo": {
                                                    "address": {
                                                        "isValidated": false,
                                                        "addressLine": ["", "", "", ""],
                                                        "country": { "code": "US" },
                                                        "type": "HOME"
                                                    },
                                                    "type": "Address",
                                                    "id": 44137
                                                }
                                            }
                                        }
                                    }
                                },
                                "reservationProfiles": {
                                    "reservationProfile": [
                                        { "reservationProfileType": "Company" },
                                        { "reservationProfileType": "Group" },
                                        { "reservationProfileType": "TravelAgent" },
                                        { "reservationProfileType": "ReservationContact" },
                                        { "reservationProfileType": "Source" },
                                        { "reservationProfileType": "Addressee" }
                                    ]
                                },
                                "reservationPaymentMethods": [
                                    { "emailFolioInfo": { "emailFolio": false }, "paymentMethod": reservation.paymentMethod, "folioView": 1 },
                                    { "emailFolioInfo": { "emailFolio": false }, "folioView": 2 },
                                    { "emailFolioInfo": { "emailFolio": false }, "folioView": 3 },
                                    { "emailFolioInfo": { "emailFolio": false }, "folioView": 4 },
                                    { "emailFolioInfo": { "emailFolio": false }, "folioView": 5 },
                                    { "emailFolioInfo": { "emailFolio": false }, "folioView": 6 },
                                    { "emailFolioInfo": { "emailFolio": false }, "folioView": 7 },
                                    { "emailFolioInfo": { "emailFolio": false }, "folioView": 8 }
                                ],
                                "cashiering": {
                                    "taxType": {
                                        "code": "",
                                        "collectingAgentTax": false,
                                        "printAutoAdjust": false
                                    },
                                    "reverseCheckInAllowed": false,
                                    "reverseAdvanceCheckInAllowed": false
                                },
                                "hotelId": reservation.hotelId,
                                "reservationStatus": "Reserved",
                                "customReference": "",
                                "displayColor": "",
                                "markAsRecentlyAccessed": true,
                                "preRegistered": false,
                                "allowMobileCheckout": false,
                                "overrideOutOfServiceCheck": true
                            }
                        }
                    ]
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .then(function (response) {
                    // console.log(response);
                    const locationHeader = response.headers.location;
                    const urlParts = locationHeader.split('/');
                    reservationId = urlParts[urlParts.length - 1];
                    console.log("Reservation created successfully, Reservation ID:", reservationId);
                });
        });

        it('GET Reservation OHIP', async function ({ supertest }) {
            await supertest
                .request(reservation.request)
                .get(reservation.Getendpath + reservationId)
                .set('Content-Type', reservation['Content-Type1'])
                .set('x-hotelid', reservation.hotelId)
                .set('x-app-key', reservation['x-app-key1'])
                .set('bypass-routing', reservation['bypass-routing'])
                .set('Authorization', 'Bearer ' + authToken)
                .expect(200)
                .expect('Content-Type', /json/)
                .then(function (response) {
                    const responseBody = JSON.parse(response.text);
                    const reservation = responseBody.reservations.reservation[0];

                    const confirmationIdEntry = reservation.reservationIdList.find(idEntry => idEntry.type === 'Confirmation');
                    confirmationId = confirmationIdEntry ? confirmationIdEntry.id : 'Not found';

                    const externalReferenceIdEntry = reservation.externalReferences.find(ref => ref.idContext === 'CRS_IHGSIT');
                    externalReferenceId = externalReferenceIdEntry ? externalReferenceIdEntry.id : 'Not found';

                    console.log("Status : Reservation created Successfully in OHIP");
                    console.log("Reservation ID :", reservationId);
                    console.log('Confirmation ID:', confirmationId);
                    console.log('External Reference ID:', externalReferenceId);
                })
        });
    });
})
