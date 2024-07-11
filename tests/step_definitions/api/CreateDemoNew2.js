const xlsx = require('xlsx');

// Function to read Excel data
function readExcel(filePath, sheetName) {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(worksheet);
}

// Function to write results to Excel
function writeResultsToExcel(filePath, sheetName, results) {
  let workbook;
  try {
    workbook = xlsx.readFile(filePath);
  } catch (error) {
    workbook = xlsx.utils.book_new();
  }
  // Check if the sheet already exists
  if (workbook.Sheets[sheetName]) {
    // Remove the existing sheet
    workbook.SheetNames = workbook.SheetNames.filter(name => name !== sheetName);
    delete workbook.Sheets[sheetName];
  }
  const newSheet = xlsx.utils.json_to_sheet(results);
  xlsx.utils.book_append_sheet(workbook, newSheet, sheetName);
  xlsx.writeFile(workbook, filePath);
}

// Correct file path and sheet name
const filePath = 'C:/Users/User/Desktop/create1.xlsx';
const sheetName = 'Sheet1'; // Ensure this matches your sheet name
const resultsSheetName = 'result';

// Utility function to format date to string (YYYY-MM-DD)
function formatDateToString(excelDate) {
  const date = new Date((excelDate - (25567 + 2)) * 86400 * 1000); // Adjust Excel date to JavaScript date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Read the data from the Excel file
const data = readExcel(filePath, sheetName);
let authToken1;
let authToken2;
let reservationId;
let confirmationId;
let externalReferenceId;
const testResults = []; // Array to store test results

describe('api Auth Token', function () {
  data.forEach(row => {
    it('GET api test', async function ({ supertest }) {
      console.log('Request:', row.request); // Debugging line
      console.log('AuthendPath:', row.Authendpath); // Debugging line

      if (!row.request || !row.Authendpath) {
        throw new Error('Missing request or AuthendPath in row');
      }

      await supertest
        .request(row.request)
        .post(row.Authendpath)
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
        });
    });

    it('post api test after login for reservation', async function ({ supertest }) {
      const formattedStartDate = formatDateToString(row.startDate); // Format startDate to string
      const formattedEndDate = formatDateToString(row.endDate); // Format endDate to string
      const formattedArrivalDate = formatDateToString(row.arrivalDate); // Format arrivalDate to string
      const formattedDepatureDate = formatDateToString(row.depatureDate); // Format depatureDate to string

      await supertest
        .request(row.request)
        .post(row.Postendpath)
        .set('Content-Type', 'application/json')
        .set('x-hotelid', row.hotelId)
        .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
        .set('bypass-routing', 'N')
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
                            "givenName": "Sangeetha",
                            "surname": "SR",
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
                    "paymentMethod": "CASH",
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
      console.log('Request:', row.request); // Debugging line
      console.log('GetendPath:', row.Getendpath); // Debugging line

      if (!row.request || !row.Getendpath) {
        throw new Error('Missing request or GetendPath in row');
      }

    
     await supertest     
      .request(row.request)
      .get(row.Getendpath + reservationId)
      .set('Content-Type', 'application/json')
      .set('x-hotelid', 'GRVZA')
      .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
      .set('bypass-routing', 'N')
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

        // Store result
        testResults.push({
          Status: 'Reservation created successfully',
          ReservationID: reservationId,
          // ArrivalDate: formattedDepatureDate, // Include formatted startDate
          // DepartureDate: formattedArrivalDate, // Include formatted endDate
          ConfirmationID: confirmationId,
          ExternalReferenceId: externalReferenceId
        });

        after(function () {
          // Write results to Excel after all tests are done
          writeResultsToExcel(filePath, resultsSheetName, testResults);
          console.log("Results written to Excel:", testResults); // Debugging line
        });
      });
    });
  });
  describe('api Authu Token2', function () {
    data.forEach(row => {
      it('GET api test 2', async function ({ supertest }) {
        await supertest
          .request(row.request1)
          .post(row.Authendpath1)
          //   .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('X-IHG-M2M', '>24Y#-#`R-S8W,2MS=&%G:6YG+6%P:2YI:&<N8V]M')
          .set('User-Agent', 'Oracle PMS to APIGee')
          .set('X-IHG-AUTO', '>24Y#-#`R-S8W,2MS=&%G:6YG+6%P:2YI:&<N8V]M')
          .set('X-IHG-API-KEY', 'Af9n4H1gUGdEAOGK6PcPk3FWX2PhyWFo')
          // .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
          .set('Authorization', 'Basic QWY5bjRIMWdVR2RFQU9HSzZQY1BrM0ZXWDJQaHlXRm86ODRjd2VVMEtBM2IycFl4WA==')
          .send({
            username: 'IHGSIT_COGNIZANT',
            //     password: 'UoHkm74M58C1#f16F3wys3U4',
            //     grant_type: 'password'
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
          .set('X-IHG-M2M', '>24Y#-#`R-S8W,2MS=&%G:6YG+6%P:2YI:&<N8V]M')
          .set('User-Agent', 'Oracle PMS to APIGee')
          .set('X-IHG-AUTO', '>24Y#-#`R-S8W,2MS=&%G:6YG+6%P:2YI:&<N8V]M')
          .set('X-IHG-API-KEY', 'Af9n4H1gUGdEAOGK6PcPk3FWX2PhyWFo')
          .set('bypass-routing', 'N')
          .set('Authorization', 'Basic QWY5bjRIMWdVR2RFQU9HSzZQY1BrM0ZXWDJQaHlXRm86ODRjd2VVMEtBM2IycFl4WA==')
          .expect(200)
          .expect('Content-Type', /json/)
          .then(function (response) {
            console.log(response.text);
            console.log("Reservation created successfully in GRS");
          });
      });
    });


    after(function () {
      // Write results to Excel after all tests are done
      writeResultsToExcel(filePath, resultsSheetName, testResults);
    });
  });
})
