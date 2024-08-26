const fs = require('fs');
const XLSX = require('xlsx');
const { faker } = require('@faker-js/faker');
const supertest = require('supertest');

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
let authToken1;
let reservationId;
let confirmationId;
let externalReferenceId;
let pmsConfirmationNumber;
let externalConfirmationNumber;
let ihgConfirmationNumber;

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

    // Authenticate and set the second authToken before running tests
    await supertest(reservation.request1)
        .post(reservation.Authendpath1)
        .set('X-IHG-M2M', reservation['X-IHG-M2M'])
        .set('User-Agent', reservation['User-Agent'])
        .set('X-IHG-AUTO', reservation['X-IHG-AUTO'])
        .set('X-IHG-API-KEY', reservation['X-IHG-API-KEY'])
        .set('Authorization', reservation.Authorization1)
        .send({
            username: reservation.username,
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function (response) {
            authToken1 = response.body.access_token;
        })
});

// Iterate through each record in the Excel file
excelData.forEach((record, index) => {
    describe('API Auth Token', function () {
        const reservation = testData.reservation;
         //check availability
    it('GET Check Availability', async function ({ supertest }) {  
        await supertest
          .request(reservation.request)
          .get(reservation.Getendpath2)
          .query({
            "roomStayStartDate": record.startDate,
            "roomStayEndDate": record.endDate,
            "hotelIds": reservation.hotelId,
            "children": reservation.children,
            "roomTypeInfo": true,
            "adults": reservation.adults,
            "ratePlanInfo": true,
            "limit": reservation.limit,
            "redeemAwards": false,
            "roomStayQuantity": reservation.roomStayQuantity,
            "initialRatePlanSet": true,
            "resGuaranteeInfo": false
          })
          .set('Content-Type', reservation['Content-Type1'])
          .set('x-hotelid', reservation.hotelId)
          .set('x-app-key', reservation['x-app-key'])
          .set('bypass-routing', reservation['bypass-routing1'])
          .set('Authorization', 'Bearer ' + authToken)
          .expect(200)
          .expect('Content-Type', /json/)
          .then(function (response) {
            // console.log(response)
          });
      })

      //check validation
    it('PUT Check Validation', async function ({ supertest }) {
        await supertest
          .request(reservation.request)
          .put(reservation.Putendpath)
          .set('Content-Type', reservation['Content-Type1'])
          .set('x-hotelid', reservation.hotelId)
          .set('x-app-key', reservation['x-app-key'])
          .set('bypass-routing', reservation['bypass-routing'])
          .set('Authorization', 'Bearer ' + authToken)
          .send(
            {
              "instructions": {
                "instruction": [
                  "Packages",
                  "InventoryItems",
                  "ReservationGuarantee",
                  "StayHeader",
                  "RefreshRates"
                ]
              },
              "reservation": {
                "roomStay": {
                  "roomRates": {
                    "rates": {
                      "rate": {
                        "base": {
                          "amountBeforeTax": 179,
                          "baseAmount": 179,
                          "currencyCode": "USD"
                        },
                        "discount": "",
                        "eventStartDate": record.startDate,
                        "startDate": record.startDate,
                        "start": record.startDate,
                        "end": record.endDate,
                        "endDate": record.endDate,
                        "eventEndDate": record.endDate
                      }
                    },
                    "stayProfiles": [
                      {
                        "reservationProfileType": "Company"
                      },
                      {
                        "reservationProfileType": "Group"
                      },
                      {
                        "reservationProfileType": "TravelAgent"
                      },
                      {
                        "reservationProfileType": "ReservationContact"
                      },
                      {
                        "reservationProfileType": "BillingContact"
                      },
                      {
                        "reservationProfileType": "Source"
                      }
                    ],
                    "guestCounts": {
                      "adults": reservation.adults,
                      "children": reservation.children
                    },
                    "taxFreeGuestCounts": {
                      "adults": 0,
                      "children": 0
                    },
                    "roomType": reservation.roomType,
                    "ratePlanCode": reservation.ratePlanCode,
                    "marketCode": reservation.marketCode,
                    "sourceCode": reservation.sourceCode,
                    "numberOfUnits": reservation.numberOfUnits,
                    "pseudoRoom": false,
                    "roomTypeCharged": reservation.roomTypeCharged,
                    "eventStartDate": record.startDate,
                    "startDate": record.startDate,
                    "start": record.startDate,
                    "end": record.endDate,
                    "endDate": record.endDate,
                    "eventEndDate": record.endDate
                  },
                  "guestCounts": {
                    "adults": reservation.adults,
                    "children": reservation.children
                  },
                  "expectedTimes": {
                    "reservationExpectedArrivalTime": record.arrivalDate,
                    "resExpectedArrivalTime": record.arrivalDate,
                    "reservationExpectedDepartureTime": record.departureDate,
                    "resExpectedDepartureTime": record.departureDate
                  },
                  "guarantee": {
                    "guaranteeCode": reservation.guaranteeCode
                  },
                  "arrivalDate": record.arrivalDate,
                  "departureDate": record.departureDate
                },
                "hotelId": reservation.hotelId,
                "preRegistered": false,
                "allowMobileCheckout": false,
                "overrideOutOfServiceCheck": true
              },
              "timeSpan": {
                "startDate": record.startDate,
                "endDate": record.endDate
              }
            }
          )
          .expect(200)
          .expect('Content-Type', /json/)
          .then(function (response) {
            // console.log(response)
          });
      });

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

        it('GET Reservation GRS', async function ({ supertest }) {
            await supertest
                .request(reservation.request1)
                .get(reservation.Getendpath1 + externalReferenceId)
                .query({
                    lastName: reservation.lastName
                })
                .set('Content-Length', '0')
                .set('X-IHG-M2M', reservation['X-IHG-M2M'])
                .set('User-Agent', reservation['User-Agent'])
                .set('X-IHG-AUTO', reservation['X-IHG-AUTO'])
                .set('X-IHG-API-KEY', reservation['X-IHG-API-KEY'])
                .set('bypass-routing', reservation['bypass-routing'])
                .set('Authorization', reservation.Authorization1)
                .expect(200)
                .expect('Content-Type', /json/)
                .then(function (response) {
                    const responseBody = JSON.parse(response.text);
                    const reservation = responseBody.hotelReservation;

                    const ihgConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.ihgConfirmationNumber);
                    ihgConfirmationNumber = ihgConfirmationNumberEntry ? ihgConfirmationNumberEntry.ihgConfirmationNumber : 'Not found';

                    const externalConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.externalConfirmationNumber && entry.externalConfirmationNumber.number);
                    externalConfirmationNumber = externalConfirmationNumberEntry ? externalConfirmationNumberEntry.externalConfirmationNumber.number : 'Not found';

                    const pmsConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.pmsConfirmationNumber);
                    pmsConfirmationNumber = pmsConfirmationNumberEntry ? pmsConfirmationNumberEntry.pmsConfirmationNumber : 'Not found';

                    console.log("Status: Reservation created Successfully in GRS");
                    console.log("IHG Confirmation Number:", ihgConfirmationNumber);
                    console.log("External Confirmation Number:", externalConfirmationNumber);
                    console.log("PMS Confirmation Number:", pmsConfirmationNumber);
                })
    });

    it("PUT Update Reservation", async function ({ supertest }) {
        await supertest
       .request(reservation.request)
       .put(reservation.Getendpath + reservationId)
       .set("Content-Type", reservation['Content-Type1'])
       .set("x-hotelid", reservation.hotelId)
       .set("x-app-key", reservation['x-app-key'])
       .set("bypass-routing", reservation['bypass-routing'])
       .set("Authorization", "Bearer " + authToken)
       .send({
           reservations: {
               responseInstructions: {
                   confirmationOnly: true,
               },
               changeInstrunctions: {
                   updatePackagePrice: false,
                   changeAllShares: false,
                   overrideInventory: false,
               },
               reservationIdList: {
                   type: "Reservation",
                   idContext: "OPERA",
                   id: reservationId,
               },
               roomStay: {
                   currentRoomInfo: {
                       roomType: reservation.roomType1,
                   },
                   roomRates: {
                       rates: {
                           rate: {
                               base: {
                                   amountBeforeTax: 299,
                                   currencyCode: "USD",
                               },
                               discount: "",
                               eventStartDate: record.startDate,
                               startDate: record.startDate,
                               start: record.startDate,
                               end: record.endDate,
                               endDate: record.endDate,
                               eventEndDate: record.endDate,
                           },
                       },
                       stayProfiles: [
                           {
                               resProfileType: "Company",
                               reservationProfileType: "Company",
                           },
                           {
                               resProfileType: "Group",
                               reservationProfileType: "Group",
                           },
                           {
                               resProfileType: "TravelAgent",
                               reservationProfileType: "TravelAgent",
                           },
                           {
                               resProfileType: "ReservationContact",
                               reservationProfileType: "ReservationContact",
                           },
                           {
                               resProfileType: "BillingContact",
                               reservationProfileType: "BillingContact",
                           },
                           {
                               resProfileType: "Source",
                               reservationProfileType: "Source",
                           },
                       ],
                       guestCounts: {
                           adults: reservation.adults,
                           children: reservation.children,
                       },
                       taxFreeGuestCounts: {
                           adults: 0,
                           children: 0,
                       },
                       roomType: reservation.roomType1,
                       ratePlanCode: reservation.ratePlanCode,
                       marketCode: reservation.marketCode,
                       sourceCode: reservation.sourceCode,
                       numberOfUnits: reservation.numberOfUnits,
                       roomId: "",
                       pseudoRoom: false,
                       roomTypeCharged: reservation.roomTypeCharged1,
                       fixedRate: true,
                       discountAllowed: true,
                       eventStartDate: record.startDate,
                       startDate: record.startDate,
                       start: record.startDate,
                       end: record.endDate,
                       endDate: record.endDate,
                       eventEndDate: record.endDate,
                   },
                   guestCounts: {
                       adults: reservation.adults,
                       children: reservation.children,
                   },
                   expectedTimes: {
                       reservationExpectedArrivalTime: record.arrivalDate,
                       resExpectedArrivalTime: record.arrivalDate,
                       reservationExpectedDepartureTime: record.departureDate,
                       resExpectedDepartureTime: record.departureDate,
                   },
                   guarantee: {
                       guaranteeCode: reservation.guaranteeCode,
                   },
                   promotion: "",
                   arrivalDate: record.arrivalDate,
                   departureDate: record.departureDate,
               },
               reservationGuests: {
                   profileInfo: {
                       profileIdList: {
                           type: "Profile",
                           idContext: "OPERA",
                           id: 45387
                       },
                       profile: {
                           customer: {
                               personName: [
                                   {
                                       givenName: reservation.givenName,
                                       surname: reservation.lastName,
                                       nameType: "Primary",
                                   },
                                   {
                                       nameType: "Alternate",
                                   },
                               ],
                           },
                       },
                   },
                   arrivalTransport: {
                       transportationReqd: false,
                   },
                   departureTransport: {
                       transportationReqd: false,
                   },
               },
               additionalGuestInfo: "",
               reservationProfiles: {
                   reservationProfile: [
                       {
                           reservationProfileType: "Company",
                       },
                       {
                           reservationProfileType: "Group",
                       },
                       {
                           reservationProfileType: "TravelAgent",
                       },
                       {
                           reservationProfileType: "ReservationContact",
                       },
                       {
                           reservationProfileType: "Source",
                       },
                       {
                           reservationProfileType: "BillingContact",
                       },
                       {
                           reservationProfileType: "Addressee",
                       },
                   ],
                   commissionPayoutTo: "None",
               },
               reservationCommunication: {
                   telephones: {
                       telephoneInfo: [
                           {
                               telephone: {
                                   orderSequence: 1,
                               },
                           },
                           {
                               telephone: {
                                   orderSequence: 2,
                               },
                           },
                       ],
                   },
                   emails: {
                       emailInfo: [
                           {
                               email: {
                                   orderSequence: 1,
                               },
                           },
                           {
                               email: {
                                   orderSequence: 2,
                               },
                           },
                       ],
                   },
               },
               cashiering: {
                   taxType: {
                       code: 0,
                       collectingAgentTax: false,
                       printAutoAdjust: false,
                   },
                   reverseCheckInAllowed: false,
                   reverseAdvanceCheckInAllowed: false,
               },
               userDefinedFields: {
                   characterUDFs: {
                       name: "UDFC01",
                       value: "T",
                   },
               },
               hotelId: reservation.hotelId,
               reservationStatus: "Reserved",
               printRate: true,
               customReference: "",
               displayColor: "",
               markAsRecentlyAccessed: true,
               preRegistered: false,
               allowMobileCheckout: false,
               optedForCommunication: false,
               overrideOutOfServiceCheck: true,
           },
       })
       .expect(200)
       .expect("Content-Type", /json/)
       .then(function (response) {
        //    console.log(response)
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

it('GET Reservation GRS', async function ({ supertest }) {
    await supertest
        .request(reservation.request1)
        .get(reservation.Getendpath1 + externalReferenceId)
        .query({
            lastName: reservation.lastName
        })
        .set('Content-Length', '0')
        .set('X-IHG-M2M', reservation['X-IHG-M2M'])
        .set('User-Agent', reservation['User-Agent'])
        .set('X-IHG-AUTO', reservation['X-IHG-AUTO'])
        .set('X-IHG-API-KEY', reservation['X-IHG-API-KEY'])
        .set('bypass-routing', reservation['bypass-routing'])
        .set('Authorization', reservation.Authorization1)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function (response) {
            const responseBody = JSON.parse(response.text);
            const reservation = responseBody.hotelReservation;

            const ihgConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.ihgConfirmationNumber);
            ihgConfirmationNumber = ihgConfirmationNumberEntry ? ihgConfirmationNumberEntry.ihgConfirmationNumber : 'Not found';

            const externalConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.externalConfirmationNumber && entry.externalConfirmationNumber.number);
            externalConfirmationNumber = externalConfirmationNumberEntry ? externalConfirmationNumberEntry.externalConfirmationNumber.number : 'Not found';

            const pmsConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.pmsConfirmationNumber);
            pmsConfirmationNumber = pmsConfirmationNumberEntry ? pmsConfirmationNumberEntry.pmsConfirmationNumber : 'Not found';

            console.log("Status: Reservation created Successfully in GRS");
            console.log("IHG Confirmation Number:", ihgConfirmationNumber);
            console.log("External Confirmation Number:", externalConfirmationNumber);
            console.log("PMS Confirmation Number:", pmsConfirmationNumber);
        })
});

it('POST Cancel Reservation', async function ({ supertest }) {
    await supertest
      .request(reservation.request)
      .post(reservation.Postendpath1)
      .set('Content-Type', reservation['Content-Type1'])
      .set('x-hotelid', reservation.hotelId)
      .set('x-app-key', reservation['x-app-key'])
      .set('bypass-routing', reservation['bypass-routing'])
      .set('Authorization', 'Bearer ' + authToken)
      .send(
        {
          "reason": {
            "description": reservation.reason,
            "code": reservation.reason
          },
          "reservations": [
            {
              "cxlInstr": {
                "deleteResTraces": false
              },
              "reservationIdList": [
                {
                  "type": "Reservation",
                  "id": reservationId
                }
              ],
              "externalCancellationId": "1234",
              "hotelId": reservation.hotelId,
              "preRegistered": false,
              "openFolio": false,
              "allowMobileCheckout": false
            },
            {
              "cxlInstr": {
                "deleteResTraces": false
              },
              "reservationIdList": [
                {
                  "type": "Reservation",
                  "id": reservationId
                }
              ],
              "externalCancellationId": "1235",
              "hotelId": reservation.hotelId,
              "preRegistered": false,
              "openFolio": false,
              "allowMobileCheckout": false
            }
          ],
          "verificationOnly": false
        }
      )
      .expect(201)
      .expect('Content-Type', /json/)
      .then(function (response) {
        // console.log(response)
        console.log("Status: Reservation cancelled Successfully");
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

it('GET Reservation GRS', async function ({ supertest }) {
    await supertest
        .request(reservation.request1)
        .get(reservation.Getendpath1 + externalReferenceId)
        .query({
            lastName: reservation.lastName
        })
        .set('Content-Length', '0')
        .set('X-IHG-M2M', reservation['X-IHG-M2M'])
        .set('User-Agent', reservation['User-Agent'])
        .set('X-IHG-AUTO', reservation['X-IHG-AUTO'])
        .set('X-IHG-API-KEY', reservation['X-IHG-API-KEY'])
        .set('bypass-routing', reservation['bypass-routing'])
        .set('Authorization', reservation.Authorization1)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function (response) {
            const responseBody = JSON.parse(response.text);
            const reservation = responseBody.hotelReservation;

            const ihgConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.ihgConfirmationNumber);
            ihgConfirmationNumber = ihgConfirmationNumberEntry ? ihgConfirmationNumberEntry.ihgConfirmationNumber : 'Not found';

            const externalConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.externalConfirmationNumber && entry.externalConfirmationNumber.number);
            externalConfirmationNumber = externalConfirmationNumberEntry ? externalConfirmationNumberEntry.externalConfirmationNumber.number : 'Not found';

            const pmsConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.pmsConfirmationNumber);
            pmsConfirmationNumber = pmsConfirmationNumberEntry ? pmsConfirmationNumberEntry.pmsConfirmationNumber : 'Not found';

            console.log("Status: Reservation created Successfully in GRS");
            console.log("IHG Confirmation Number:", ihgConfirmationNumber);
            console.log("External Confirmation Number:", externalConfirmationNumber);
            console.log("PMS Confirmation Number:", pmsConfirmationNumber);
        })
});
});
})

