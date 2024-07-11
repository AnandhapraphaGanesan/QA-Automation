const xlsx = require('xlsx');
const path = require('path');

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

function writeExcel(filePath, sheetName, data) {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];

  // Update the worksheet with new data
  data.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellAddress = xlsx.utils.encode_cell({ c: colIndex, r: rowIndex });
      if (!worksheet[cellAddress]) {
        worksheet[cellAddress] = { t: 's', v: cell };
      } else {
        worksheet[cellAddress].v = cell;
      }
    });
  });

  // Write the updated workbook back to file
  xlsx.writeFile(workbook, filePath);
}

// Correct file path and sheet name
const filePath = 'C:/Users/User/Desktop/Createreservation.xlsx';
const sheetName = 'Sheet1'; // Ensure this matches your sheet name
const data = readExcel(filePath, sheetName);

let authToken;
let campaignId;

describe('api Auth Token', function () {
  data.forEach((row, index) => {
    if (index === 0) return; // Skip header row

    it('GET api test', async function ({ supertest }) {
      await supertest
        .request(row[3]) // assuming row.request is in column 0
        .post(row[4]) // assuming row.Authendpath is in column 1
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
          authToken = response.body.access_token;
        });
    });

    it(`post api test after login for reservation`, async function ({ supertest }) {
      const formattedStartDate = formatDateToString(row[6]); // assuming startDate is in column 2
      const formattedEndDate = formatDateToString(row[7]); // assuming endDate is in column 3
      const formattedArrivalDate = formatDateToString(row[14]); // assuming arrivalDate is in column 4
      const formattedDepatureDate = formatDateToString(row[15]); // assuming depatureDate is in column 5

      await supertest
        .request(row[3])
        .post(row[5]) // assuming Postendpath is in column 6
        .set('Content-Type', 'application/json')
        .set('x-hotelid', 'GRVZA')
        .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
        .set('bypass-routing', 'N')
        .set('Authorization', 'Bearer ' + authToken)
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
                    "adults": row[12], // assuming adults is in column 7
                    "children": row[13] // assuming children is in column 8
                  },
                  "roomType": row[0], // assuming roomtype is in column 9
                  "ratePlanCode": row[8], // assuming ratePlanCode is in column 10
                  "marketCode": row[1], // assuming marketcode is in column 11
                  "sourceCode": row[2], // assuming sourcecode is in column 12
                  "numberOfUnits": row[9], // assuming numberOfUnits is in column 13
                  "pseudoRoom": false,
                  "roomTypeCharged": row[10], // assuming roomTypeCharged is in column 14
                  "start": formattedStartDate,
                  "end": formattedEndDate
                },
                "guestCounts": {
                  "adults": row[12], // assuming adults is in column 7
                  "children": row[13] // assuming children is in column 8
                },
                "expectedTimes": {
                  "reservationExpectedArrivalTime": formattedArrivalDate,
                  "reservationExpectedDepartureTime": formattedDepatureDate
                },
                "guarantee": {
                  "guaranteeCode": row[11], // assuming guaranteeCode is in column 15
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
          console.log(response);
          const locationHeader = response.headers.location;
          console.log("Location Header: ", locationHeader);

          const urlParts = locationHeader.split('/');
          campaignId = urlParts[urlParts.length - 1];
          console.log("Campaign ID: ", campaignId);

          // Update the Excel sheet with the new campaignId
          data[index][17] = campaignId; // assuming campaignId should be written in column 16
          writeExcel(filePath, sheetName, data);
        });
    });

    it(`Get api test after login for reservation`, async function ({ supertest }) {
      await supertest
        .request(row[3])
        .get(row[16] + campaignId) // assuming Getendpath is in column 17
        .set('Content-Type', 'application/json')
        .set('x-hotelid', 'GRVZA')
        .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
        .set('bypass-routing', 'N')
        .set('Authorization', 'Bearer ' + authToken)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function (response) {
          console.log(response);
          const responseBody = JSON.parse(response.text); // Parse the response body from JSON text
          const reservation = responseBody.reservations.reservation[0]; // Get the first reservation

          // Extracting the confirmation ID
          const confirmationIdEntry = reservation.reservationIdList.find(idEntry => idEntry.type === 'Confirmation');
          const confirmationId = confirmationIdEntry ? confirmationIdEntry.id : 'Not found';

          // Extracting the external reference ID
          const externalReferenceIdEntry = reservation.externalReferences.find(ref => ref.idContext === 'CRS_IHGSIT');
          const externalReferenceId = externalReferenceIdEntry ? externalReferenceIdEntry.id : 'Not found';

          // Logging both IDs to the console
          console.log("Status : Reservation created Successfully");
          console.log("Reservation ID :" + campaignId);
          console.log('Confirmation ID:', confirmationId);
          console.log('External Reference ID:', externalReferenceId);
        });
    });
  });
});
