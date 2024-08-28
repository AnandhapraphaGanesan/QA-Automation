const xlsx = require('xlsx');

// Function to read Excel data - input sheet
function readExcel(filePath, sheetName) {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(worksheet);
}

// Function to write results to Excel - output sheet
function writeResultsToExcel(filePath, sheetName, results) {
    try {
        const workbook = xlsx.readFile(filePath); //Reading the Excel File
        const existingSheet = workbook.Sheets[sheetName]; // Accessing the Existing Sheet

        // Read existing data if the sheet exists - output side
        let existingData = []; // Initializing Existing Data Array
        if (existingSheet) {
            existingData = xlsx.utils.sheet_to_json(existingSheet, { header: 1 }); // Converting Existing Sheet Data to JSON
        }

        // Find the first empty row
        const firstEmptyRow = existingData.findIndex(row => row.length === 0); //Finding the First Empty Row
        const startRow = firstEmptyRow === -1 ? existingData.length : firstEmptyRow; //Determining the Start Row for New Data

        // // Append new results to existing data
        // for (let i = 0; i < results.length; i++) {
        //     existingData[startRow + i] = Object.values(results[i]);
        // }

        // Append new results to existing data
        results.forEach((result, index) => {
            const row = Object.values(result);
            existingData[startRow + index] = row;
        });

        // Remove the existing sheet if it exists - input to result sheet
        if (workbook.SheetNames.includes(sheetName)) {
            delete workbook.Sheets[sheetName];
            const sheetIndex = workbook.SheetNames.indexOf(sheetName);
            if (sheetIndex > -1) {
                workbook.SheetNames.splice(sheetIndex, 1);
            }
        }

        const newSheet = xlsx.utils.aoa_to_sheet(existingData); //Creating a New Sheet with Updated Data
        xlsx.utils.book_append_sheet(workbook, newSheet, sheetName);//Appending the New Sheet to the Workbook
        xlsx.writeFile(workbook, filePath);
    } catch (error) {
        console.error(`Error writing to Excel file: ${error.message}`);
    }
}

// Utility function to format date to string (YYYY-MM-DD) - input sheet
function formatDateToString(excelDate) {
    const date = new Date((excelDate - (25567 + 2)) * 86400 * 1000); // Adjust Excel date to JavaScript date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; //Returning the Formatted Date String
}

// Utility function to get current date and time as a formatted string - output sheet
function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Correct file path and sheet name
const filePath = 'C:/Users/User/Desktop/Reservation.xlsx';
const sheetName = 'CreateReservation'; // Ensure this matches your sheet name
const resultsSheetName = 'Result';

// Read the data from the Excel file
const data = readExcel(filePath, sheetName);
let authToken1;
let authToken2;
let reservationId;
let reservationId1;
let confirmationId;
let confirmationId1;
let externalReferenceId;
let externalReferenceId1;
let ihgConfirmationNumber;
let ihgConfirmationNumber1;
let externalConfirmationNumber;
let externalConfirmationNumber1;
let pmsConfirmationNumber;
let pmsConfirmationNumber1;
let formattedArrivalDate;
let formattedDepatureDate;
const testResults = []; // Array to store test results

describe('Api Auth Token1', function () {
    data.forEach(row => {
        it('GET AuthToken1', async function ({ supertest }) {
            await supertest
                .request(row.request)
                .post(row.Authendpath)
                .set('Content-Type', row['Content-Type']) // Use bracket notation here
                .set('x-app-key', row['x-app-key']) // Use bracket notation here
                .set('Authorization', row.Authorization)
                .send({
                    username: row.username,
                    password: row.password,
                    grant_type: 'password'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .then(function (response) {
                    authToken1 = response.body.access_token;
                })
                .catch(function (error) {
                    console.error('Error in GET api test:', error);
                });
        });

        //check availability
        it('GET Check Availability', async function ({ supertest }) {
            const formattedStartDate = formatDateToString(row.startDate); // Format startDate to string
            const formattedEndDate = formatDateToString(row.endDate); // Format endDate to string
            formattedArrivalDate = formatDateToString(row.arrivalDate); // Format arrivalDate to string
            formattedDepatureDate = formatDateToString(row.depatureDate); // Format depatureDate to string

            await supertest
                .request(row.request)
                .get(row.Getendpath2)
                .query({
                    "roomStayStartDate": formattedStartDate,
                    "roomStayEndDate": formattedEndDate,
                    "hotelIds": row.hotelId,
                    "children": row.children,
                    "roomTypeInfo": true,
                    "adults": row.adults,
                    "ratePlanInfo": true,
                    "limit": row.limit,
                    "redeemAwards": false,
                    "roomStayQuantity": row.roomStayQuantity,
                    "initialRatePlanSet": true,
                    "resGuaranteeInfo": false
                })
                .set('Content-Type', row['Content-Type1'])
                .set('x-hotelid', row.hotelId)
                .set('x-app-key', row['x-app-key'])
                .set('bypass-routing', row['bypass-routing1'])
                .set('Authorization', 'Bearer ' + authToken1)
                .expect(200)
                .expect('Content-Type', /json/)
                .then(function (response) {
                    //console.log(response)
                });
        })

        //check validation
        it('PUT Check Validation', async function ({ supertest }) {
            const formattedStartDate = formatDateToString(row.startDate); // Format startDate to string
            const formattedEndDate = formatDateToString(row.endDate); // Format endDate to string
            formattedArrivalDate = formatDateToString(row.arrivalDate); // Format arrivalDate to string
            formattedDepatureDate = formatDateToString(row.depatureDate); // Format depatureDate to string
            await supertest
                .request(row.request)
                .put(row.Putendpath)
                .set('Content-Type', row['Content-Type1'])
                .set('x-hotelid', row.hotelId)
                .set('x-app-key', row['x-app-key'])
                .set('bypass-routing', row['bypass-routing'])
                .set('Authorization', 'Bearer ' + authToken1)
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
                                            "eventStartDate": formattedStartDate,
                                            "startDate": formattedStartDate,
                                            "start": formattedStartDate,
                                            "end": formattedEndDate,
                                            "endDate": formattedEndDate,
                                            "eventEndDate": formattedEndDate
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
                                        "adults": row.adults,
                                        "children": row.children
                                    },
                                    "taxFreeGuestCounts": {
                                        "adults": 0,
                                        "children": 0
                                    },
                                    "roomType": row.roomType,
                                    "ratePlanCode": row.ratePlanCode,
                                    "marketCode": row.marketCode,
                                    "sourceCode": row.sourceCode,
                                    "numberOfUnits": row.numberOfUnits,
                                    "pseudoRoom": false,
                                    "roomTypeCharged": row.roomTypeCharged,
                                    "eventStartDate": formattedStartDate,
                                    "startDate": formattedStartDate,
                                    "start": formattedStartDate,
                                    "end": formattedEndDate,
                                    "endDate": formattedEndDate,
                                    "eventEndDate": formattedEndDate
                                },
                                "guestCounts": {
                                    "adults": row.adults,
                                    "children": row.children
                                },
                                "expectedTimes": {
                                    "reservationExpectedArrivalTime": formattedArrivalDate,
                                    "resExpectedArrivalTime": formattedArrivalDate,
                                    "reservationExpectedDepartureTime": formattedDepatureDate,
                                    "resExpectedDepartureTime": formattedDepatureDate
                                },
                                "guarantee": {
                                    "guaranteeCode": row.guaranteeCode
                                },
                                "arrivalDate": formattedArrivalDate,
                                "departureDate": formattedDepatureDate
                            },
                            "hotelId": row.hotelId,
                            "preRegistered": false,
                            "allowMobileCheckout": false,
                            "overrideOutOfServiceCheck": true
                        },
                        "timeSpan": {
                            "startDate": formattedStartDate,
                            "endDate": formattedEndDate
                        }
                    }
                )
                .expect(200)
                .expect('Content-Type', /json/)
                .then(function (response) {
                    //  console.log(response)
                });
        });

        it('Post Create Reservation', async function ({ supertest }) {
            const formattedStartDate = formatDateToString(row.startDate); // Format startDate to string
            const formattedEndDate = formatDateToString(row.endDate); // Format endDate to string
            formattedArrivalDate = formatDateToString(row.arrivalDate); // Format arrivalDate to string
            formattedDepatureDate = formatDateToString(row.depatureDate); // Format depatureDate to string
            await supertest
                .request(row.request)
                .post(row.Postendpath)
                .set('Content-Type', row['Content-Type1'])
                .set('x-hotelid', row.hotelId)
                .set('x-app-key', row['x-app-key'])
                .set('bypass-routing', row['bypass-routing'])
                .set('Authorization', 'Bearer ' + authToken1)
                .send(
                    {
                        "reservations": {
                            "reservation": {
                                "roomStay": {
                                    "roomRates": {
                                        "rates": {
                                            "rate": {
                                                "base": {
                                                    "amountBeforeTax": 299,
                                                    "baseAmount": 299
                                                },
                                                "start": formattedStartDate,
                                                "end": formattedEndDate
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
                                            "adults": row.adults,
                                            "children": row.children
                                        },
                                        "roomType": row.roomType,
                                        "ratePlanCode": row.ratePlanCode,
                                        "marketCode": row.marketCode,
                                        "sourceCode": row.sourceCode,
                                        "numberOfUnits": row.numberOfUnits,
                                        "pseudoRoom": false,
                                        "roomTypeCharged": row.roomTypeCharged,
                                        "start": formattedStartDate,
                                        "end": formattedEndDate
                                    },
                                    "guestCounts": {
                                        "adults": row.adults,
                                        "children": row.children
                                    },
                                    "expectedTimes": {
                                        "reservationExpectedArrivalTime": formattedArrivalDate,
                                        "reservationExpectedDepartureTime": formattedDepatureDate
                                    },
                                    "guarantee": {
                                        "guaranteeCode": row.guaranteeCode,
                                        "onHold": false
                                    },
                                    "arrivalDate": formattedArrivalDate,
                                    "departureDate": formattedDepatureDate
                                },
                                "reservationGuests": {
                                    "profileInfo": {
                                        "profileIdList": {
                                            "type": "Profile",
                                            "id": 45387
                                        },
                                        "profile": {
                                            "customer": {
                                                "personName": [
                                                    {
                                                        "givenName": row.givenName,
                                                        "surname": row.lastName,
                                                        "nameType": "Primary"
                                                    },
                                                    {
                                                        "nameType": "Alternate"
                                                    }
                                                ]
                                            },
                                            "addresses": {
                                                "addressInfo": {
                                                    "address": {
                                                        "isValidated": false,
                                                        "addressLine": [
                                                            "",
                                                            "",
                                                            "",
                                                            ""
                                                        ],
                                                        "country": {
                                                            "code": "US"
                                                        },
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
                                            "reservationProfileType": "Source"
                                        },
                                        {
                                            "reservationProfileType": "Addressee"
                                        }
                                    ]
                                },
                                "reservationPaymentMethods": [
                                    {
                                        "emailFolioInfo": {
                                            "emailFolio": false
                                        },
                                        "paymentMethod": row.paymentMethod,
                                        "folioView": 1
                                    },
                                    {
                                        "emailFolioInfo": {
                                            "emailFolio": false
                                        },
                                        "folioView": 2
                                    },
                                    {
                                        "emailFolioInfo": {
                                            "emailFolio": false
                                        },
                                        "folioView": 3
                                    },
                                    {
                                        "emailFolioInfo": {
                                            "emailFolio": false
                                        },
                                        "folioView": 4
                                    },
                                    {
                                        "emailFolioInfo": {
                                            "emailFolio": false
                                        },
                                        "folioView": 5
                                    },
                                    {
                                        "emailFolioInfo": {
                                            "emailFolio": false
                                        },
                                        "folioView": 6
                                    },
                                    {
                                        "emailFolioInfo": {
                                            "emailFolio": false
                                        },
                                        "folioView": 7
                                    },
                                    {
                                        "emailFolioInfo": {
                                            "emailFolio": false
                                        },
                                        "folioView": 8
                                    }
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
                                "hotelId": row.hotelId,
                                "reservationStatus": "Reserved",
                                "customReference": "",
                                "displayColor": "",
                                "markAsRecentlyAccessed": true,
                                "preRegistered": false,
                                "allowMobileCheckout": false,
                                "overrideOutOfServiceCheck": true
                            }
                        }
                    }
                )
                .expect(201)
                .expect('Content-Type', /json/)
                .then(function (response) {
                    const locationHeader = response.headers.location;
                    const urlParts = locationHeader.split('/');
                    reservationId = urlParts[urlParts.length - 1];
                    console.log("Reservation created successfully, Reservation ID:", reservationId);
                })
                .catch(function (error) {
                    console.error('Error in post api test after login for reservation:', error);
                });
        });
    });

    data.forEach(row => {
        it('GET Reservation OHIP', async function ({ supertest }) {
            await supertest
                .request(row.request)
                .get(row.Getendpath + reservationId)
                .set('Content-Type', row['Content-Type1'])
                .set('x-hotelid', row.hotelId)
                .set('x-app-key', row['x-app-key'])
                .set('bypass-routing', row['bypass-routing'])
                .set('Authorization', 'Bearer ' + authToken1)
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
                .catch(function (error) {
                    console.error('Error in Get api test after login:', error);
                });
        });
    });

    describe('Api Authu Token2', function () {
        data.forEach(row => {
            it('GET AuthToken2', async function ({ supertest }) {
                await supertest
                    .request(row.request1)
                    .post(row.Authendpath1)
                    .set('X-IHG-M2M', row['X-IHG-M2M'])
                    .set('User-Agent', row['User-Agent'])
                    .set('X-IHG-AUTO', row['X-IHG-AUTO'])
                    .set('X-IHG-API-KEY', row['X-IHG-API-KEY'])
                    .set('Authorization', row.Authorization1)
                    .send({
                        username: row.username,
                    })
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .then(function (response) {
                        authToken2 = response.body.access_token;
                    })
                    .catch(function (error) {
                        console.error('Error in GET api test 2:', error);
                    });
            });

            it('GET Reservation GRS', async function ({ supertest }) {
                await supertest
                    .request(row.request1)
                    .get(row.Getendpath1 + externalReferenceId)
                    .query({
                        lastName: row.lastName
                    })
                    .set('Content-Length', '0')
                    .set('X-IHG-M2M', row['X-IHG-M2M'])
                    .set('User-Agent', row['User-Agent'])
                    .set('X-IHG-AUTO', row['X-IHG-AUTO'])
                    .set('X-IHG-API-KEY', row['X-IHG-API-KEY'])
                    .set('bypass-routing', row['bypass-routing'])
                    .set('Authorization', row.Authorization1)
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
                    .catch(function (error) {
                        console.error('Error in Get api test 3:', error);
                    });
            });
        })

        data.forEach(row => {
            it("POST Copy Reservation", async function ({ supertest }) {
                const formattedStartDate = formatDateToString(row.startDate); // Format startDate to string
                const formattedEndDate = formatDateToString(row.endDate); // Format endDate to string
                formattedArrivalDate = formatDateToString(row.arrivalDate); // Format arrivalDate to string
                formattedDepatureDate = formatDateToString(row.depatureDate); // Format depatureDate to string
                await supertest
                    .request(row.request)
                    .post(`/rsv/v1/hotels/GRVZA/reservations/${reservationId}/copy`)
                    .set("Content-Type", row['Content-Type1'])
                    .set("x-hotelid", row.hotelId)
                    .set("x-app-key", row['x-app-key'])
                    .set("bypass-routing", row['bypass-routing'])
                    .set("Authorization", "Bearer " + authToken1)
                    .send(
                        {
                            "criteria": {
                                "hotelId": row.hotelId,
                                "sourceReservationId": {
                                    "type": "Reservation",
                                    "id": reservationId
                                },
                                "newReservation": {
                                    "reservationIdList": {
                                        "type": "Confirmation",
                                        "id": confirmationId
                                    },
                                    "roomStay": {
                                        "roomRates": {
                                            "rates": {
                                                "rate": {
                                                    "base": {
                                                        "amountBeforeTax": 299,
                                                        "baseAmount": 299,
                                                        "currencyCode": "USD"
                                                    },
                                                    "discount": "",
                                                    "requiredPoints": "",
                                                    "start": formattedStartDate,
                                                    "end": formattedEndDate
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
                                                "adults": row.adults,
                                                "children": row.children
                                            },
                                            "taxFreeGuestCounts": {
                                                "adults": 0,
                                                "children": 0
                                            },
                                            "roomType": row.roomType1,
                                            "ratePlanCode": row.ratePlanCode,
                                            "marketCode": row.marketCode,
                                            "sourceCode": row.sourceCode,
                                            "numberOfUnits": row.numberOfUnits,
                                            "pseudoRoom": false,
                                            "roomTypeCharged": row.roomTypeCharged1,
                                            "start": formattedStartDate,
                                            "end": formattedEndDate
                                        },
                                        "guestCounts": {
                                            "adults": row.adults,
                                            "children": row.children
                                        },
                                        "expectedTimes": {
                                            "reservationExpectedArrivalTime": formattedArrivalDate,
                                            "reservationExpectedDepartureTime": formattedDepatureDate
                                        },
                                        "guarantee": {
                                            "guaranteeCode": row.guaranteeCode
                                        },
                                        "arrivalDate": formattedArrivalDate,
                                        "departureDate": formattedDepatureDate
                                    },
                                    "reservationGuests": {
                                        "profileInfo": {
                                            "profileIdList": {
                                                "type": "Profile",
                                                "id": 45431
                                            },
                                            "profile": {
                                                "customer": {
                                                    "personName": [
                                                        {
                                                            "surname": "kp",
                                                            "nameType": "Primary"
                                                        },
                                                        {
                                                            "nameType": "Alternate"
                                                        }
                                                    ]
                                                },
                                                "addresses": {
                                                    "addressInfo": {
                                                        "address": {
                                                            "isValidated": false,
                                                            "addressLine": [
                                                                "",
                                                                "",
                                                                "",
                                                                ""
                                                            ],
                                                            "country": ""
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "arrivalTransport": {
                                            "transportationReqd": false
                                        },
                                        "departureTransport": {
                                            "transportationReqd": false
                                        }
                                    },
                                    "reservationProfiles": {
                                        "reservationProfile": [
                                            {
                                                "resProfileType": "Company",
                                                "reservationProfileType": "Company"
                                            },
                                            {
                                                "resProfileType": "Group",
                                                "reservationProfileType": "Group"
                                            },
                                            {
                                                "resProfileType": "TravelAgent",
                                                "reservationProfileType": "TravelAgent"
                                            },
                                            {
                                                "resProfileType": "ReservationContact", 
                                                "reservationProfileType": "ReservationContact"
                                            },
                                            {
                                                "resProfileType": "Source",
                                                "reservationProfileType": "Source"
                                            },
                                            { 
                                                "resProfileType": "Addressee",
                                                "reservationProfileType": "Addressee"
                                            } 
                                        ]
                                    },
                                    "reservationPaymentMethods": {
                                        "emailFolioInfo": {
                                            "emailFolio": false
                                        },
                                        "paymentMethod": row.paymentMethod,
                                        "folioView": 1
                                    },
                                    "hotelId": row.hotelId,
                                    "reservationStatus": "Reserved",
                                    "walkIn": false,
                                    "customReference": "",
                                    "displayColor": "",
                                    "preRegistered": false,
                                    "allowMobileCheckout": false
                                },
                                "instructions": {
                                    "includePayments": false,
                                    "includeSpecials": true,
                                    "includeRouting": true,
                                    "includeComments": false,
                                    "includePackages": true,
                                    "includeItemInventory": true, 
                                    "includeCreditCardPayments": true,
                                    "includeNonCreditCardPayments": true,
                                    "includeCompRouting": false
                                }
                            }
                        }
                    )
                    .expect(200)
                    .expect("Content-Type", /json/)
                    .then(function (response) {
                        console.log(response)
                        const locationHeader = response.headers.location;
                        console.log("Location Header:", locationHeader);
                        
                        // Extract the last reservation ID from the location header
                        const locationParts = locationHeader.split('/');
                        const reservationId1 = locationParts[locationParts.length - 1];
            
                        console.log("Last Reservation ID:", reservationId1);
            });

            data.forEach(row => {
                it('GET Reservation OHIP1', async function ({ supertest }) {
                    await supertest
                        .request(row.request)
                        .get(row.Getendpath + reservationId1)
                        .set('Content-Type', row['Content-Type1'])
                        .set('x-hotelid', row.hotelId)
                        .set('x-app-key', row['x-app-key'])
                        .set('bypass-routing', row['bypass-routing'])
                        .set('Authorization', 'Bearer ' + authToken1)
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .then(function (response) {
                            console.log(response);
                            const responseBody = JSON.parse(response.text);
                            const reservation = responseBody.reservations.reservation[0];

                            const confirmationIdEntry = reservation.reservationIdList.find(idEntry => idEntry.type === 'Confirmation');
                            confirmationId1 = confirmationIdEntry ? confirmationIdEntry.id : 'Not found';

                            const externalReferenceIdEntry = reservation.externalReferences.find(ref => ref.idContext === 'CRS_IHGSIT');
                            externalReferenceId1 = externalReferenceIdEntry ? externalReferenceIdEntry.id : 'Not found';

                            console.log("Status : Reservation created Successfully in OHIP");
                            console.log("Reservation ID1 :", reservationId1);
                            console.log('Confirmation ID1 :', confirmationId1);
                            console.log('External Reference ID1 :', externalReferenceId1);
                        })
                });
            });

            describe('Api Authu Token3', function () {
                data.forEach(row => {
                    it('GET AuthToken3', async function ({ supertest }) {
                        await supertest
                            .request(row.request1)
                            .post(row.Authendpath1)
                            .set('X-IHG-M2M', row['X-IHG-M2M'])
                            .set('User-Agent', row['User-Agent'])
                            .set('X-IHG-AUTO', row['X-IHG-AUTO'])
                            .set('X-IHG-API-KEY', row['X-IHG-API-KEY'])
                            .set('Authorization', row.Authorization1)
                            .send({
                                username: row.username,
                            })
                            .expect(200)
                            .expect('Content-Type', /json/)
                            .then(function (response) {
                                authToken2 = response.body.access_token;
                            })
                            .catch(function (error) {
                                console.error('Error in GET api test 2:', error);
                            });
                    });

                    it('GET Reservation GRS1', async function ({ supertest }) {
                        await supertest
                            .request(row.request1)
                            .get(row.Getendpath1 + externalReferenceId1)
                            .query({
                                lastName: row.lastName
                            })
                            .set('Content-Length', '0')
                            .set('X-IHG-M2M', row['X-IHG-M2M'])
                            .set('User-Agent', row['User-Agent'])
                            .set('X-IHG-AUTO', row['X-IHG-AUTO'])
                            .set('X-IHG-API-KEY', row['X-IHG-API-KEY'])
                            .set('bypass-routing', row['bypass-routing'])
                            .set('Authorization', row.Authorization1)
                            .expect(200)
                            .expect('Content-Type', /json/)
                            .then(function (response) {
                                const responseBody = JSON.parse(response.text);
                                const reservation = responseBody.hotelReservation;

                                const ihgConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.ihgConfirmationNumber);
                                ihgConfirmationNumber1 = ihgConfirmationNumberEntry ? ihgConfirmationNumberEntry.ihgConfirmationNumber : 'Not found';

                                const externalConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.externalConfirmationNumber && entry.externalConfirmationNumber.number);
                                externalConfirmationNumber1 = externalConfirmationNumberEntry ? externalConfirmationNumberEntry.externalConfirmationNumber.number : 'Not found';

                                const pmsConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.pmsConfirmationNumber);
                                pmsConfirmationNumber1 = pmsConfirmationNumberEntry ? pmsConfirmationNumberEntry.pmsConfirmationNumber : 'Not found';

                                console.log("Status: Reservation created Successfully in GRS");
                                console.log("IHG Confirmation Number1 :", ihgConfirmationNumber1);
                                console.log("External Confirmation Number1 :", externalConfirmationNumber1);
                                console.log("PMS Confirmation Number1 :", pmsConfirmationNumber1);
                            })
                    });
                });
            });
        })
    })
    // Store result
    testResults.push({
        Status: 'Reservation created successfully ',
        ReservationID: reservationId,
        ConfirmationID: confirmationId,
        ExternalReferenceId: externalReferenceId,
        IHGConfirmationNumber: ihgConfirmationNumber,
        ExternalConfirmationNumber: externalConfirmationNumber,
        PMSConfirmationNumber: pmsConfirmationNumber,
        ArrivalDate: formattedArrivalDate,
        DepartureDate: formattedDepatureDate,
        DateTime: getCurrentDateTime(),
    });
    after(function () {
        writeResultsToExcel(filePath, resultsSheetName, testResults);
    });
})
})


