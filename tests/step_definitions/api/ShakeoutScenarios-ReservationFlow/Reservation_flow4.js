const fs = require('fs');
const supertest = require('supertest');
const path = require('path');
const XLSX = require('xlsx');

let authToken;
let authToken1;
let reservationId;
let confirmationId;
let externalReferenceId;
let pmsConfirmationNumber;
let externalConfirmationNumber;
let ihgConfirmationNumber;
let excelData = [];

const FilePath = './Config.json';
const Data = JSON.parse(fs.readFileSync(FilePath, 'utf8'));
const filepath = Data.filepath;
 
// Load the JSON data from the file
const jsonFilePath = filepath.jsonfilePath;
const testData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

describe('api Authu Token', function () {
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

        const reservation = testData.reservation;
         //check availability
    it('GET Check Availability', async function ({ supertest }) {  
        await supertest
          .request(reservation.request)
          .get(reservation.Getendpath2)
          .query({
            "roomStayStartDate": reservation.startDate,
            "roomStayEndDate": reservation.endDate,
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
            console.log("Check Availability Done Successfully")
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
                        "eventStartDate": reservation.startDate,
                        "startDate": reservation.startDate,
                        "start": reservation.startDate,
                        "end": reservation.endDate,
                        "endDate": reservation.endDate,
                        "eventEndDate": reservation.endDate
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
                    "numberOfUnits": reservation.numberOfUnits1,
                    "pseudoRoom": false,
                    "roomTypeCharged": reservation.roomTypeCharged,
                    "eventStartDate":  reservation.startDate,
                    "startDate":  reservation.startDate,
                    "start":  reservation.startDate,
                    "end": reservation.endDate,
                    "endDate": reservation.endDate,
                    "eventEndDate": reservation.endDate
                  },
                  "guestCounts": {
                    "adults": reservation.adults,
                    "children": reservation.children
                  },
                  "expectedTimes": {
                    "reservationExpectedArrivalTime": reservation.arrivalDate,
                    "resExpectedArrivalTime": reservation.arrivalDate,
                    "reservationExpectedDepartureTime": reservation.departureDate,
                    "resExpectedDepartureTime": reservation.departureDate
                  },
                  "guarantee": {
                    "guaranteeCode": reservation.guaranteeCode
                  },
                  "arrivalDate": reservation.arrivalDate,
                  "departureDate": reservation.departureDate
                },
                "hotelId": reservation.hotelId,
                "preRegistered": false,
                "allowMobileCheckout": false,
                "overrideOutOfServiceCheck": true
              },
              "timeSpan": {
                "startDate": reservation.startDate,
                "endDate": reservation.endDate
              }
            }
          )
          .expect(200)
          .expect('Content-Type', /json/)
          .then(function (response) {
            console.log("Validation done Successfully")
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
                                                        "start": reservation.startDate,
                                                        "end": reservation.endDate
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
                                            "numberOfUnits": reservation.numberOfUnits1,
                                            "pseudoRoom": false,
                                            "roomTypeCharged": reservation.roomTypeCharged,
                                            "start": reservation.startDate,
                                            "end": reservation.endDate
                                        }
                                    ],
                                    "guestCounts": {
                                        "adults": reservation.adults,
                                        "children": reservation.children
                                    },
                                    "expectedTimes": {
                                        "reservationExpectedArrivalTime": reservation.arrivalDate,
                                        "reservationExpectedDepartureTime": reservation.departureDate
                                    },
                                    "guarantee": {
                                        "guaranteeCode": reservation.guaranteeCode,
                                        "onHold": false
                                    },
                                    "arrivalDate": reservation.arrivalDate,
                                    "departureDate": reservation.departureDate
                                },
                                "reservationGuests": {
                                    "profileInfo": {
                                        "profileIdList": {
                                            "type": "Profile",
                                            "id":"53872"
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
                                                    "id":"48582"
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
                .set('Authorization', 'Bearer ' + authToken1)
                .expect(200)
                .expect('Content-Type', /json/)
                .then(function (response) {
                    //console.log(response)
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

            it("PUT SplitRoom Reservation", async function ({ supertest }) {
                await supertest
                    .request(reservation.request)
                    .put(`/rsv/v1/reservations/${reservationId}/split`)
                    .set("Content-Type", reservation['Content-Type1'])
                    .set("x-hotelid", reservation.hotelId)
                    .set("x-app-key", reservation['x-app-key'])
                    .set("bypass-routing", reservation['bypass-routing'])
                    .set("Authorization", "Bearer " + authToken)
                    .send(
                        {
                            "reservationId": {
                              "type": "Reservation",
                              "idContext": "OPERA",
                              "id": reservationId
                            },
                            "reservationPaymentMethods": {
                              "copyCreditCards": true,
                              "copyOthers": true,
                              "reservationPaymentMethod": [{
                                "emailFolioInfo": {
                                  "emailFolio": false
                                },
                                "paymentMethod": "CASH",
                                "folioView": "1"
                              }]
                            },
                            "responseInstructions": {
                              "fetchLinkedReservations": false,
                              "fetchNewReservationIDs": false
                            },
                            "lockHandle": 0,
                            "splitAll": true
                          }
                    )
                    .expect(200)
                    .expect("Content-Type", /json/)
                    .then(function (response) {
                        console.log("SplitRoom Reservation - ONE done Successfully")
                    });
            });
            
             // Spilt after get
             it("Get OHIP after spilt", async function ({ supertest }) {
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
                    const confirmationId = confirmationIdEntry ? confirmationIdEntry.id : 'Not found';
           
                    const externalReferenceIdEntry = reservation.externalReferences.find(ref => ref.idContext === 'CRS_IHGSIT');
                    const externalReferenceId = externalReferenceIdEntry ? externalReferenceIdEntry.id : 'Not found';
           
                    const arrivalDate = reservation.roomStay.arrivalDate || 'Not found';
                    const departureDate = reservation.roomStay.departureDate || 'Not found';
                   
                     
                const linkedReservations = responseBody.reservations.reservation[0].linkedReservation.reservationInfo;
               
                    linkedReservations.forEach(reservation => {
                            reservation.reservationIdList.forEach(idEntry => {
                                console.log(`ID: ${idEntry.id}, Type: ${idEntry.type}`);
                            });
                        });
            
                    console.log(`Status: Reservation retrieved successfully`);
                    console.log(`Reservation ID: ${reservationId}`);
                    console.log(`Confirmation ID: ${confirmationId}`);
                    console.log(`External Reference ID: ${externalReferenceId}`);
                    console.log(`Arrival Date: ${arrivalDate}`);
                    console.log(`Departure Date: ${departureDate}`);
                });
            });

            it("Get GRS after spilt", async function ({ supertest }) {
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
                 .set('Authorization', 'Bearer ' + authToken1)
                .expect(200)
                .expect('Content-Type', /json/)
                .then(function (response) {
                   //console.log(response)
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
                    excelData.push([reservationId, confirmationId,externalReferenceId,ihgConfirmationNumber,externalConfirmationNumber,pmsConfirmationNumber]);
                });
            });
            after(function () {
              const excelFilePath = path.join(filepath.xlsfilepath);
             
              // Ensure the directory exists
              const dir = path.dirname(excelFilePath);
              if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir, { recursive: true });
              }
           
              let wb;
              let ws;
             
              // Define a unique sheet name for each program
              const sheetName = 'flow4';  // Change this for each program (e.g., 'Program1', 'Program2', etc.)
           
              // Use an object to map sheet names to their corresponding headers
              const headersMap = {
                  'flow4': ['Reservation ID', 'Confirmation ID', 'External Reference ID', 'IHG Confirmation Number', 'External Confirmation Number', 'PMS Confirmation Number', 'CancellationId1', 'CancellationStatus1'],
                 
              };
           
              // Get the appropriate headers for the current program from the map
              const headers = headersMap[sheetName];
           
              // Check if the Excel file exists
              if (fs.existsSync(excelFilePath)) {
                  // If the file exists, read the workbook
                  wb = XLSX.readFile(excelFilePath);
           
                  // Check if the specific sheet for the program exists
                  if (wb.SheetNames.includes(sheetName)) {
                      // Load the existing sheet
                      ws = wb.Sheets[sheetName];
           
                      // Convert the existing sheet to JSON format for easy manipulation
                      let existingData = XLSX.utils.sheet_to_json(ws, { header: 1 });
           
                      // Append new data to the existing sheet
                      existingData.push(...excelData);
           
                      // Log the data being appended for debugging
                     // console.log("Data being appended:", existingData);
           
                      // Convert the updated data back to a sheet
                      ws = XLSX.utils.aoa_to_sheet(existingData);
           
                      // Remove the old sheet
                      wb.SheetNames = wb.SheetNames.filter(sheet => sheet !== sheetName);
                  } else {
                      // If the sheet doesn't exist, create it and prepend headers
                      let existingData = [];
                      existingData.push(headers);  // Add headers for the new sheet
                      existingData.push(...excelData);
           
                      // Create a new sheet from the data
                      ws = XLSX.utils.aoa_to_sheet(existingData);
                  }
              } else {
                  // If the file doesn't exist, create a new workbook and sheet
                  wb = XLSX.utils.book_new();
           
                  let existingData = [];
                  existingData.push(headers);  // Add headers for the new sheet
                  existingData.push(...excelData);
           
                  // Create a new sheet from the data
                  ws = XLSX.utils.aoa_to_sheet(existingData);
              }
           
              // Append the updated or newly created sheet to the workbook
              XLSX.utils.book_append_sheet(wb, ws, sheetName);
           
              // Save the updated workbook to the Excel file
              XLSX.writeFile(wb, excelFilePath);
             // console.log(`Data successfully saved to ${excelFilePath} under sheet: ${sheetName}`);
            });
            });
            