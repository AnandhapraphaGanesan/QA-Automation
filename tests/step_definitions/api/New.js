
const fs = require('fs');
const path = require('path');

let authToken;

// Correctly resolve the path to the JSON file using path.join and __dirname
//const jsonFilePath = path.join('C:', 'Users', 'User', 'Desktop', 'NewJson.json');

// Directly specify the absolute path
 const jsonFilePath = 'C:/Users/User/Desktop/NewJson.json';

// Load the JSON data from the file
const testData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
console.log(testData)

describe('API Auth Token', function () {
  it('post api test', async function ({ supertest }) {
    await supertest
      .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
      .post("/oauth/v1/tokens")
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('x-app-key', '1639912d-392a-473b-ad6f-272421e24849')
      .set('Authorization', 'Basic Og==')
      .send(
        {
            username: 'IHGSIT_COGNIZANT',
            password: 'UoHkm74M58C1#f16F3wys3U4',
            grant_type: 'password'
          }
      )
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        authToken = response._body.access_token;
        // console.log(response);
      });
  });

//   it('post api test after login', async function ({ supertest }) {
//     await supertest
//       .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
//       .post("/rsv/v1/hotels/GRVZA/reservations")
//       .set('Content-Type', 'application/json')
//       .set('x-hotelid', testData.reservation.hotelId)
//       .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
//       .set('bypass-routing', 'N')
//       .set('Authorization', 'Bearer ' + authToken)
//       .send({
//         "reservations": {
//           "reservation": {
//             "roomStay": {
//               "roomRates": {
//                 "rates": {
//                   "rate": {
//                     "base": {
//                       "amountBeforeTax": 299,
//                       "baseAmount": 299
//                     },
//                     "start": testData.reservation.startDate,
//                     "end": testData.reservation.endDate
//                   }
//                 },
//                 "stayProfiles": [
//                   {
//                     "reservationProfileType": "Company"
//                   },
//                   {
//                     "reservationProfileType": "Group"
//                   },
//                   {
//                     "reservationProfileType": "TravelAgent"
//                   },
//                   {
//                     "reservationProfileType": "ReservationContact"
//                   },
//                   {
//                     "reservationProfileType": "BillingContact"
//                   },
//                   {
//                     "reservationProfileType": "Source"
//                   }
//                 ],
//                 "guestCounts": {
//                   "adults": testData.reservation.adults,
//                   "children": testData.reservation.children
//                 },
//                 "roomType": testData.reservation.roomType,
//                 "ratePlanCode": testData.reservation.ratePlanCode,
//                 "marketCode": testData.reservation.marketCode,
//                 "sourceCode": testData.reservation.sourceCode,
//                 "numberOfUnits": testData.reservation.numberOfUnits,
//                 "pseudoRoom": false,
//                 "roomTypeCharged": testData.reservation.roomTypeCharged,
//                 "start": testData.reservation.startDate,
//                 "end": testData.reservation.endDate
//               },
//               "guestCounts": {
//                 "adults": testData.reservation.adults,
//                 "children": testData.reservation.children
//               },
//               "expectedTimes": {
//                 "reservationExpectedArrivalTime": testData.reservation.arrivalDate,
//                 "reservationExpectedDepartureTime": testData.reservation.departureDate
//               },
//               "guarantee": {
//                 "guaranteeCode": testData.reservation.guaranteeCode,
//                 "onHold": false
//               },
//               "arrivalDate": testData.reservation.arrivalDate,
//               "departureDate": testData.reservation.departureDate
//             },
//             "reservationGuests": {
//               "profileInfo": {
//                 "profileIdList": {
//                   "type": "Profile",
//                   "id": 45387
//                 },
//                 "profile": {
//                   "customer": {
//                     "personName": [
//                       {
//                         "givenName": "Sangeetha",
//                         "surname": "SR",
//                         "nameType": "Primary"
//                       },
//                       {
//                         "nameType": "Alternate"
//                       }
//                     ]
//                   },
//                   "addresses": {
//                     "addressInfo": {
//                       "address": {
//                         "isValidated": false,
//                         "addressLine": [
//                           "",
//                           "",
//                           "",
//                           ""
//                         ],
//                         "country": {
//                           "code": "US"
//                         },
//                         "type": "HOME"
//                       },
//                       "type": "Address",
//                       "id": 44137
//                     }
//                   }
//                 }
//               }
//             },
//             "reservationProfiles": {
//               "reservationProfile": [
//                 {
//                   "reservationProfileType": "Company"
//                 },
//                 {
//                   "reservationProfileType": "Group"
//                 },
//                 {
//                   "reservationProfileType": "TravelAgent"
//                 },
//                 {
//                   "reservationProfileType": "ReservationContact"
//                 },
//                 {
//                   "reservationProfileType": "Source"
//                 },
//                 {
//                   "reservationProfileType": "Addressee"
//                 }
//               ]
//             },
//             "reservationPaymentMethods": [
//               {
//                 "emailFolioInfo": {
//                   "emailFolio": false
//                 },
//                 "paymentMethod": testData.reservation.paymentMethod,
//                 "folioView": 1
//               },
//               {
//                 "emailFolioInfo": {
//                   "emailFolio": false
//                 },
//                 "folioView": 2
//               },
//               {
//                 "emailFolioInfo": {
//                   "emailFolio": false
//                 },
//                 "folioView": 3
//               },
//               {
//                 "emailFolioInfo": {
//                   "emailFolio": false
//                 },
//                 "folioView": 4
//               },
//               {
//                 "emailFolioInfo": {
//                   "emailFolio": false
//                 },
//                 "folioView": 5
//               },
//               {
//                 "emailFolioInfo": {
//                   "emailFolio": false
//                 },
//                 "folioView": 6
//               },
//               {
//                 "emailFolioInfo": {
//                   "emailFolio": false
//                 },
//                 "folioView": 7
//               },
//               {
//                 "emailFolioInfo": {
//                   "emailFolio": false
//                 },
//                 "folioView": 8
//               }
//             ],
//             "cashiering": {
//               "taxType": {
//                 "code": "",
//                 "collectingAgentTax": false,
//                 "printAutoAdjust": false
//               },
//               "reverseCheckInAllowed": false,
//               "reverseAdvanceCheckInAllowed": false
//             },
//             "hotelId": testData.reservation.hotelId,
//             "reservationStatus": "Reserved",
//             "customReference": "",
//             "displayColor": "",
//             "markAsRecentlyAccessed": true,
//             "preRegistered": false,
//             "allowMobileCheckout": false,
//             "overrideOutOfServiceCheck": true
//           }
//         }
//       })
//       .expect(201)
//       .expect('Content-Type', /json/)
//       .then(function (response) {
//         console.log(response);
//       });
//   });
// });

it('post api test after login', async function ({ supertest }) {
  const reservation = testData.reservation;

  if (!reservation) {
    throw new Error("Reservation data is missing in testData.");
  }

  await supertest
    .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
    .post("/rsv/v1/hotels/GRVZA/reservations")
    .set('Content-Type', 'application/json')
    .set('x-hotelid', reservation.hotelId)
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
                  "start": reservation.startDate,
                  "end": reservation.endDate
                }
              },
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
              "start": reservation.startDate,
              "end": reservation.endDate
            },
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
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .then(function (response) {
      console.log(response.body);
    });
});
});