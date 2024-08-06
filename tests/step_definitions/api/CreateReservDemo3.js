const xlsx = require('xlsx');
const fs = require('fs');

// Function to read Excel data
function readExcel(filePath, sheetName) {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(worksheet);
}

// Function to write results to Excel
function writeResultsToExcel(filePath, sheetName, results) {
    const workbook = xlsx.readFile(filePath);
    const existingSheet = workbook.Sheets[sheetName];

    // Read existing data if the sheet exists
    let existingData = [];
    if (existingSheet) {
        existingData = xlsx.utils.sheet_to_json(existingSheet, { header: 1 });
    }

    // Find the first empty row
    const firstEmptyRow = existingData.findIndex(row => row.length === 0);
    const startRow = firstEmptyRow === -1 ? existingData.length : firstEmptyRow;

    // Append new results to existing data
    for (let i = 0; i < results.length; i++) {
        existingData[startRow + i] = Object.values(results[i]);
    }

    // Remove the existing sheet if it exists
    if (workbook.SheetNames.includes(sheetName)) {
        delete workbook.Sheets[sheetName];
        const sheetIndex = workbook.SheetNames.indexOf(sheetName);
        if (sheetIndex > -1) {
            workbook.SheetNames.splice(sheetIndex, 1);
        }
    }

    const newSheet = xlsx.utils.aoa_to_sheet(existingData);
    xlsx.utils.book_append_sheet(workbook, newSheet, sheetName);
    xlsx.writeFile(workbook, filePath);
}

// // Function to write results to Excel
// function writeResultsToExcel(filePath, sheetName, results) {
//     let workbook;
//     let worksheet;

//     // Check if the file exists
//     if (fs.existsSync(filePath)) {
//         workbook = xlsx.readFile(filePath);
//         worksheet = workbook.Sheets[sheetName] || xlsx.utils.aoa_to_sheet([]);
//     } else {
//         workbook = xlsx.utils.book_new();
//         worksheet = xlsx.utils.aoa_to_sheet([]);
//         xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
//     }

//     // Convert worksheet to JSON format and append new results
//     let existingData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
//     results.forEach((result) => {
//         existingData.push(Object.values(result));
//     });

//     // Update the worksheet with the new data
//     worksheet = xlsx.utils.aoa_to_sheet(existingData);
//     workbook.Sheets[sheetName] = worksheet;

//     // Write the updated workbook back to the file
//     xlsx.writeFile(workbook, filePath);
// }


// Utility function to format date to string (YYYY-MM-DD)
function formatDateToString(excelDate) {
    const date = new Date((excelDate - (25567 + 2)) * 86400 * 1000); // Adjust Excel date to JavaScript date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Utility function to get current date and time as a formatted string
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
const filePath = 'C:/Users/User/Desktop/Demo1.xlsx';
const sheetName = 'CreateReservation'; // Ensure this matches your sheet name
const resultsSheetName = 'Result';

// Read the data from the Excel file
const data = readExcel(filePath, sheetName);
let authToken1;
let authToken2;
let reservationId;
let confirmationId;
let externalReferenceId;
let ihgConfirmationNumber;
let externalConfirmationNumber;
let pmsConfirmationNumber;
let formattedArrivalDate;
let formattedDepatureDate;
let DateTime;
const testResults = []; // Array to store test results

describe('api Auth Token1', function () {
    data.forEach(row => {
        it('GET api test', async function ({ supertest }) {
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
                });
        });

        it('post api test after login for reservation', async function ({ supertest }) {
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
                                    "reverseAdvanceCheckInAllowed": falses
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
                    console.log(response);
                    const locationHeader = response.headers.location;
                    console.log("Location Header: ", locationHeader);

                    const urlParts = locationHeader.split('/');
                    reservationId = urlParts[urlParts.length - 1];
                    console.log("Reservation ID: ", reservationId);
                    console.log("Reservation created successfully");

                });
        });
    });

    data.forEach(row => {
        it('Get api test after login', async function ({ supertest }) {
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
                    console.log(response);
                    const responseBody = JSON.parse(response.text); // Parse the response body from JSON text
                    const reservation = responseBody.reservations.reservation[0]; // Get the first reservation

                    // Extracting the confirmation ID
                    const confirmationIdEntry = reservation.reservationIdList.find(idEntry => idEntry.type === 'Confirmation');
                    confirmationId = confirmationIdEntry ? confirmationIdEntry.id : 'Not found';

                    // Extracting the external reference ID
                    const externalReferenceIdEntry = reservation.externalReferences.find(ref => ref.idContext === 'CRS_IHGSIT');
                    externalReferenceId = externalReferenceIdEntry ? externalReferenceIdEntry.id : 'Not found';

                    // Logging both IDs to the console
                    console.log("Status : Reservation created Successfully in OHIP");
                    console.log("Reservation ID :", reservationId);
                    console.log('Confirmation ID:', confirmationId);
                    console.log('External Reference ID:', externalReferenceId);
                });
        });
    });
    describe('api Authu Token2', function () {
        data.forEach(row => {
            it('GET api test 2', async function ({ supertest }) {
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
                        authToken2 = response._body.access_token;
                    });
            });
            it('Get api test 3', async function ({ supertest }) {
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
                        console.log(response);                        
                        const responseBody = JSON.parse(response.text); // Parse the response body from JSON text
                        const reservation = responseBody.hotelReservation; // Get the reservation object

                        // Extracting the IHG confirmation number
                        const ihgConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.ihgConfirmationNumber);
                        const ihgConfirmationNumber = ihgConfirmationNumberEntry ? ihgConfirmationNumberEntry.ihgConfirmationNumber : 'Not found';

                        // Extracting the external confirmation number
                        const externalConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.externalConfirmationNumber && entry.externalConfirmationNumber.number);
                        const externalConfirmationNumber = externalConfirmationNumberEntry ? externalConfirmationNumberEntry.externalConfirmationNumber.number : 'Not found';

                        // Extracting the PMS confirmation number
                        const pmsConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.pmsConfirmationNumber);
                        const pmsConfirmationNumber = pmsConfirmationNumberEntry ? pmsConfirmationNumberEntry.pmsConfirmationNumber : 'Not found';

                        // Logging the IDs to the console
                        console.log("Status: Reservation created Successfully in GRS");
                        console.log("IHG Confirmation Number:", ihgConfirmationNumber);
                        console.log("External Confirmation Number:", externalConfirmationNumber);
                        console.log("PMS Confirmation Number:", pmsConfirmationNumber);
                    });

                // Store result
                testResults.push({
                    Status: 'Reservation created successfully ',
                    ReservationID: reservationId,
                    ConfirmationID: confirmationId,
                    ExternalReferenceId: externalReferenceId,
                    IHGConfirmationNumber: ihgConfirmationNumber,
                    ExternalConfirmationNumber: externalConfirmationNumber,
                    PMSConfirmationNumber: pmsConfirmationNumber,
                    ArrivalDate: formattedArrivalDate, // Include formatted arrivalDate
                    DepartureDate: formattedDepatureDate, // Include formatted depatureDate
                    DateTime: getCurrentDateTime()
                });
            });
        }); 
        after(function () {
            // Write results to Excel after all tests are done
            writeResultsToExcel(filePath, resultsSheetName, testResults);
        });
    });
});


