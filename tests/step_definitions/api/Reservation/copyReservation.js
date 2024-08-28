let authToken;

describe('api Authu Token', function () {
  it('post api test', async function ({ supertest }) {
    await supertest
      .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
      .post("/oauth/v1/tokens")
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('x-app-key', '1639912d-392a-473b-ad6f-272421e24849')
      .set('Authorization', 'Basic Og==')
      .send({
        username: 'IHGSIT_COGNIZANT',
        password: 'UoHkm74M58C1#f16F3wys3U4',
        grant_type: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        authToken = response._body.access_token;
      });
  });
});

it('post api test after login', async function ({ supertest }) {
  await supertest
    .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
    .post("/rsv/v1/hotels/GRVZA/reservations/85594/copy")
    .set('Content-Type', 'application/json')
    .set('x-hotelid', 'GRVZA')
    .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
    .set('bypass-routing', 'N')
    .set('Authorization', 'Bearer ' + authToken)
    .send(
      {
        "criteria": {
          "hotelId": "GRVZA",
          "sourceReservationId": {
            "type": "Reservation",
            "id": 85594
          },
          "newReservation": {
            "reservationIdList": {
              "type": "Confirmation",
              "id": 181877
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
                    "start": "2024-08-26",
                    "end": "2024-08-26"
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
                  "adults": 1,
                  "children": 0
                },
                "taxFreeGuestCounts": {
                  "adults": 0,
                  "children": 0
                },
                "roomType": "KNGN",
                "ratePlanCode": "IGCOR",
                "marketCode": "G",
                "sourceCode": "GD",
                "numberOfUnits": 1,
                "pseudoRoom": false,
                "roomTypeCharged": "KNGN",
                "start": "2024-08-26",
                "end": "2024-08-26"
              },
              "guestCounts": {
                "adults": 1,
                "children": 0
              },
              "expectedTimes": {
                "reservationExpectedArrivalTime": "2024-08-26",
                "reservationExpectedDepartureTime": "2024-08-27"
              },
              "guarantee": {
                "guaranteeCode": "INN"
              },
              "arrivalDate": "2024-08-26",
              "departureDate": "2024-08-27"
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
              "paymentMethod": "CASH",
              "folioView": 1
            },
            "hotelId": "GRVZA",
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
    .expect('Content-Type', /json/)
    .then(function (response) {
      console.log(response)
    });
});