let authToken;
describe('api Authu Token', function () {
  it('post api test', async function ({ supertest }) {
    await supertest
      .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
      .post("/oauth/v1/tokens")
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
        authToken = response._body.access_token;
      });
  });
  it('post api test after login', async function ({ supertest }) {
    await supertest
      .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
      .post("/rsv/v1/hotels/GRVZA/reservations")
      .set('Content-Type', 'application/json')
      .set('x-hotelid', 'GRVZA')
      .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
      .set('bypass-routing', 'N')
      .set('Authorization', 'Bearer ' + authToken)
      .send(
        {
          "reservations": {
            "reservation": {
              "roomStay": {
                "roomRates": [
                  {
                    "rates": {
                      "rate": {
                        "base": {
                          "amountBeforeTax": 299,
                          "baseAmount": 299
                        },
                        "start": "2024-08-20",
                        "end": "2024-08-20"
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
                      "adults": 2,
                      "children": 0
                    },
                    "roomType": "KNGN",
                    "ratePlanCode": "IGCOR",
                    "marketCode": "G",
                    "sourceCode": "GD",
                    "numberOfUnits": 1,
                    "pseudoRoom": false,
                    "roomTypeCharged": "KNGN",
                    "start": "2024-08-20",
                    "end": "2024-08-20"
                  },
                  {
                    "rates": {
                      "rate": {
                        "base": {
                          "amountBeforeTax": 299,
                          "baseAmount": 299
                        },
                        "start": "2024-08-21",
                        "end": "2024-08-21"
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
                      "adults": 2,
                      "children": 0
                    },
                    "roomType": "KNGN",
                    "ratePlanCode": "IGCOR",
                    "marketCode": "G",
                    "sourceCode": "GD",
                    "numberOfUnits": 1,
                    "pseudoRoom": false,
                    "roomTypeCharged": "KNGN",
                    "start": "2024-08-21",
                    "end": "2024-08-21"
                  }
                ],
                "guestCounts": {
                  "adults": 2,
                  "children": 0
                },
                "expectedTimes": {
                  "reservationExpectedArrivalTime": "2024-08-20",
                  "reservationExpectedDepartureTime": "2024-08-22"
                },
                "guarantee": {
                  "guaranteeCode": "INN",
                  "onHold": false
                },
                "arrivalDate": "2024-08-20",
                "departureDate": "2024-08-22"
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
        }
      )
      .expect(201)
      .expect('Content-Type', /json/)
      .then(function (response) {
        console.log(response)
      });
  });
})
