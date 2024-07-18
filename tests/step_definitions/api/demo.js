const xlsx = require('xlsx');
const supertest = require('supertest');

// Function to read Excel data
function readExcel(filePath, sheetName) {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(worksheet, { header: 1 });
}

// Utility function to format date to string (YYYY-MM-DD)
function formatDateToString(excelDate) {
  const date = new Date((excelDate - (25567 + 2)) * 86400 * 1000); // Adjust Excel date to JavaScript date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Function to write results to Excel
function writeResultsToExcel(filePath, sheetName, results) {
  const workbook = xlsx.readFile(filePath);

  // Remove the existing sheet if it exists
  if (workbook.SheetNames.includes(sheetName)) {
    delete workbook.Sheets[sheetName];
    const sheetIndex = workbook.SheetNames.indexOf(sheetName);
    if (sheetIndex > -1) {
      workbook.SheetNames.splice(sheetIndex, 1);
    }
  }

  const newSheet = xlsx.utils.json_to_sheet(results);
  xlsx.utils.book_append_sheet(workbook, newSheet, sheetName);
  xlsx.writeFile(workbook, filePath);
}

// Correct file path and sheet name
const filePath = 'C:/Users/User/Desktop/createReservation.xlsx';
const sheetName = 'createreservation'; // Ensure this matches your sheet name
const resultsSheetName = 'reports';

// Read the data from the Excel file
const data = readExcel(filePath, sheetName);
let authToken1;
let campaignId;
const testResults = []; // Array to store test results

describe('API Tests', function () {
  data.slice(1).forEach((row, rowIndex) => { // Start from the second row (index 1)
    it('GET api test', async function () {
      console.log(`Row ${rowIndex}: URL = ${row[0]}, Endpoint = ${row[1]}`);

      await supertest
        .request(row[0])
        .post(row[1])
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
        .set('Authorization', 'Basic Og==')
        .send({
          username: 'IHGSIT_COGNIZANT',
          password: 'UoHkm74M58C1#f16F3wys3U4',
          grant_type: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function (response) {
          authToken1 = response.body.access_token;
          console.log('Access Token1:', authToken1);

          // Save authToken1 to testResults
          testResults.push({
            rowIndex: rowIndex + 2, // Adjust for header row
            authToken1: authToken1,
            campaignId: '',
            status: 'GET api test passed'
          });
        });
    });

    it('POST api reservation', async function () {
      console.log(`Row ${rowIndex}: URL = ${row[0]}, Endpoint = ${row[2]}`);

      const formattedStartDate = formatDateToString(row[4]); // Format startDate to string
      const formattedEndDate = formatDateToString(row[5]); // Format endDate to string
      const formattedArrivalDate = formatDateToString(row[6]); // Format arrivalDate to string
      const formattedDepatureDate = formatDateToString(row[7]); // Format depatureDate to string

      await supertest
        .request(row[0])
        .post(row[2])
        .set('Content-Type', 'application/json')
        .set('x-hotelid', 'GRVZA')
        .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
        .set('bypass-routing', 'N')
        .set('Authorization', 'Bearer ' + authToken1)
        .send({
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
                    { "reservationProfileType": "Company" },
                    { "reservationProfileType": "Group" },
                    { "reservationProfileType": "TravelAgent" },
                    { "reservationProfileType": "ReservationContact" },
                    { "reservationProfileType": "BillingContact" },
                    { "reservationProfileType": "Source" }
                  ],
                  "guestCounts": {
                    "adults": row[14],
                    "children": row[15]
                  },
                  "roomType": row[8],
                  "ratePlanCode": row[9],
                  "marketCode": row[10],
                  "sourceCode": row[11],
                  "numberOfUnits": row[12],
                  "pseudoRoom": false,
                  "roomTypeCharged": row[13],
                  "start": formattedStartDate,
                  "end": formattedEndDate
                },
                "guestCounts": {
                  "adults": row[14],
                  "children": row[15]
                },
                "expectedTimes": {
                  "reservationExpectedArrivalTime": formattedArrivalDate,
                  "reservationExpectedDepartureTime": formattedDepatureDate
                },
                "guarantee": {
                  "guaranteeCode": row[16],
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
                        { "givenName": "Sangeetha", "surname": "SR", "nameType": "Primary" },
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
                { "emailFolioInfo": { "emailFolio": false }, "paymentMethod": "CASH", "folioView": 1 },
                { "emailFolioInfo": { "emailFolio": false }, "folioView": 2 },
                { "emailFolioInfo": { "emailFolio": false }, "folioView": 3 },
                { "emailFolioInfo": { "emailFolio": false }, "folioView": 4 },
                { "emailFolioInfo": { "emailFolio": false }, "folioView": 5 },
                { "emailFolioInfo": { "emailFolio": false }, "folioView": 6 },
                { "emailFolioInfo": { "emailFolio": false }, "folioView": 7 },
                { "emailFolioInfo": { "emailFolio": false }, "folioView": 8 }
              ],
              "cashiering": {
                "taxType": { "code": "", "collectingAgentTax": false, "printAutoAdjust": false },
                "reverseCheckInAllowed": false,
                "reverseAdvanceCheckInAllowed": false
              },
              "hotelId": "GRVZA",
              "reservationStatus": "Reserved",
              "customReference": "",
              "displayColor": "",
              "markAsRecentlyAccessed": true,
              "preRegistered": false,
              "allowMobileCheckout": false,
              "overrideOutOfServiceCheck": true
            }
          }
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .then(function (response) {
          const locationHeader = response.headers.location;
          const urlParts = locationHeader.split('/');
          campaignId = urlParts[urlParts.length - 1];
          console.log("Campaign ID: ", campaignId);

          // Update the test result with campaignId
          const resultIndex = testResults.findIndex(result => result.rowIndex === rowIndex + 2);
          if (resultIndex !== -1) {
            testResults[resultIndex].campaignId = campaignId;
            testResults[resultIndex].status = 'POST api reservation passed';
          } else {
            testResults.push({
              rowIndex: rowIndex + 2,
              authToken1: authToken1,
              campaignId: campaignId,
              status: 'POST api reservation passed'
            });
          }
        });
    });
  });

  after(function () {
    // Write results to Excel after all tests are done
    writeResultsToExcel(filePath, resultsSheetName, testResults);
  });
});
