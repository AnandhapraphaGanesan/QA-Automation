const fs = require('fs');
const XLSX = require('xlsx');
const { faker } = require('@faker-js/faker');

// Generate fake data
function generateFakeData() {
    const arrivalDate = faker.date.future();
    const formattedArrivalDate = arrivalDate.toISOString().split('T')[0];
    const departureDate = new Date(arrivalDate);
    departureDate.setDate(arrivalDate.getDate() + 1);
    const formattedDepartureDate = departureDate.toISOString().split('T')[0];

    return {
        startDate: formattedArrivalDate,
        endDate: formattedArrivalDate,
        arrivalDate: formattedArrivalDate,
        departureDate: formattedDepartureDate,
    };
}

// Create an array of fake data records
const numberOfRecords = 3;
const fakeDataArray = Array.from({ length: numberOfRecords }, generateFakeData);

// Display the fake data
console.log(fakeDataArray);

// Create a new workbook and add a worksheet with the fake data
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(fakeDataArray); // Use fakeDataArray here
XLSX.utils.book_append_sheet(workbook, worksheet, 'FakeData');

// Write the workbook to a file
const filePath = 'C:/Users/User/Desktop/CreateReservation.xlsx';
XLSX.writeFile(workbook, filePath);

console.log(`Data has been written to ${filePath}`);

let authToken1;
let reservationId;

// Load the JSON data from the file
const jsonFilePath = 'C:/Users/User/Desktop/NewJson.json';
const testData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
console.log(testData);

describe('API Auth Token', function () {
    const reservation = testData.reservation;
   

        it('post api test', async function ({ supertest }) {
            await supertest
                .request(reservation.request)
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
                    authToken1 = response._body.access_token;
                });
        });
    

        it('post api test after login using fake data', async function ({ supertest }) {
            // Iterate through each fake data record to make multiple requests
            for (const record of fakeDataArray) {
            console.log('Using Fake Data Record:', record);
            await supertest
                .request(reservation.request)
                .post(reservation.Postendpath)
                .set('Content-Type', reservation['Content-Type1'])
                .set('x-hotelid', reservation.hotelId)
                .set('x-app-key', reservation['x-app-key1'])
                .set('bypass-routing', reservation['bypass-routing'])
                .set('Authorization', 'Bearer ' + authToken1)
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
                                                        "start": record.startDate,  // Using the fake start date
                                                        "end": record.endDate      // Using the fake end date
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
                                        "reservationExpectedArrivalTime": record.arrivalDate,  // Using the fake arrival date
                                        "reservationExpectedDepartureTime": record.departureDate   // Using the fake departure date
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
            }
            });
        })



