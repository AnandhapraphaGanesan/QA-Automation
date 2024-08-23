const fs = require('fs');
const xlsx = require('xlsx');

let authToken;
let reservationId;
let formattedStartDate;
let formattedEndDate;
let formattedArrivalDate;
let formattedDepartureDate;

// Directly specify the absolute path
 const jsonFilePath = 'C:/Users/User/Desktop/NewJson.json';
 const excelFilePath = 'C:/Users/User/Desktop//CreateReservation.xlsx';

// Load the JSON data from the file
const testData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
console.log(testData)

// Load the Excel data from the file
const workbook = xlsx.readFile(excelFilePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const excelData = xlsx.utils.sheet_to_json(worksheet);
console.log(excelData)

// Extract and format dates from the Excel data
// const startDate = formatDateToString(excelData[0]['startDate']);
// const endDate = formatDateToString(excelData[0]['endDate']);
// const arrivalDate = formatDateToString(excelData[0]['arrivalDate']);
// const departureDate = formatDateToString(excelData[0]['departureDate']);

// Utility function to format date to string (YYYY-MM-DD) 
function formatDateToString(excelDate) {
  const date = new Date((excelDate - (25567 + 2)) * 86400 * 1000); // Adjust Excel date to JavaScript date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; //Returning the Formatted Date String
}
 
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
        authToken = response._body.access_token;
        // console.log(response);
      });
  });

it('post api test after login', async function ({ supertest }) {
  const row = excelData[1];  // Access the first row of Excel data
  formattedStartDate = formatDateToString(row.startDate); // Format startDate to string
  formattedEndDate = formatDateToString(row.endDate); // Format endDate to string
  formattedArrivalDate = formatDateToString(row.arrivalDate); // Format arrivalDate to string
  formattedDepartureDate = formatDateToString(row.departureDate); // Format depatureDate to string

  

  await supertest
    .request(reservation.request)
    .post(reservation.Postendpath)
    .set('Content-Type',  reservation['Content-Type1'])
    .set('x-hotelid', reservation.hotelId)
    .set('x-app-key',  reservation['x-app-key1'] )
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
                        "start":  formattedStartDate ,
                        "end":   formattedEndDate
                      }
                    }
                  ],
              "stayProfiles": [
                {"reservationProfileType": "Company"},
                {"reservationProfileType": "Group"},
                {"reservationProfileType": "TravelAgent"},
                {"reservationProfileType": "ReservationContact"},
                {"reservationProfileType": "BillingContact"},
                {"reservationProfileType": "Source"}
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
              "start":  formattedStartDate,
              "end":   formattedEndDate
            }
          ],
            "guestCounts": {
              "adults": reservation.adults,
              "children": reservation.children
            },
            "expectedTimes": {
                "reservationExpectedArrivalTime":   formattedArrivalDate,
                "reservationExpectedDepartureTime":   formattedDepartureDate
            },
            "guarantee": {
              "guaranteeCode": reservation.guaranteeCode,
              "onHold": false
            },
              "arrivalDate":   formattedArrivalDate,
              "departureDate":  formattedDepartureDate
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
                    {"nameType": "Alternate"}
                  ]
                },
                "addresses": {
                  "addressInfo": {
                    "address": {
                      "isValidated": false,
                      "addressLine": ["", "", "", ""],
                      "country": {"code": "US"},
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
              {"reservationProfileType": "Company"},
              {"reservationProfileType": "Group"},
              {"reservationProfileType": "TravelAgent"},
              {"reservationProfileType": "ReservationContact"},
              {"reservationProfileType": "Source"},
              {"reservationProfileType": "Addressee"}
            ]
          },
          "reservationPaymentMethods": [
            {"emailFolioInfo": {"emailFolio": false}, "paymentMethod": reservation.paymentMethod, "folioView": 1},
            {"emailFolioInfo": {"emailFolio": false}, "folioView": 2},
            {"emailFolioInfo": {"emailFolio": false}, "folioView": 3},
            {"emailFolioInfo": {"emailFolio": false}, "folioView": 4},
            {"emailFolioInfo": {"emailFolio": false}, "folioView": 5},
            {"emailFolioInfo": {"emailFolio": false}, "folioView": 6},
            {"emailFolioInfo": {"emailFolio": false}, "folioView": 7},
            {"emailFolioInfo": {"emailFolio": false}, "folioView": 8}
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
      console.log(response);
      const locationHeader = response.headers.location;
      const urlParts = locationHeader.split('/');
      reservationId = urlParts[urlParts.length - 1];
      console.log("Reservation created successfully, Reservation ID:", reservationId);
    });
});

// it('GET Reservation OHIP', async function ({ supertest }) {
//     await supertest
//     .request(reservation.request)
//     .get(reservation.Getendpath + reservationId)
//     .set('Content-Type', reservation['Content-Type1'])
//     .set('x-hotelid', reservation.hotelId)
//     .set('x-app-key', reservation['x-app-key1'])
//     .set('bypass-routing', reservation['bypass-routing'])
//     .set('Authorization', 'Bearer ' + authToken)
//     .expect(200)
//     .expect('Content-Type', /json/)
//     .then(function (response) {
//       console.log(response);
//       const responseBody = JSON.parse(response.text);
//       const reservation = responseBody.reservations.reservation[0];

//       const confirmationIdEntry = reservation.reservationIdList.find(idEntry => idEntry.type === 'Confirmation');
//       confirmationId = confirmationIdEntry ? confirmationIdEntry.id : 'Not found';

//       const externalReferenceIdEntry = reservation.externalReferences.find(ref => ref.idContext === 'CRS_IHGSIT');
//       externalReferenceId = externalReferenceIdEntry ? externalReferenceIdEntry.id : 'Not found';

//       console.log("Status : Reservation created Successfully in OHIP");
//       console.log("Reservation ID :", reservationId);
//       console.log('Confirmation ID:', confirmationId);
//       console.log('External Reference ID:', externalReferenceId);
//     })
// });
 });

