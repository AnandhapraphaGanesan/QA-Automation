let authToken;
let campaignId;

describe('API Authentication Token', function () {
    it('GET API Test', async function ({ supertest }) {
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
                authToken = response.body.access_token;
            });
    });

    it('POST API Reservation', async function ({ supertest }) {
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
                          "roomRates": {
                            "rates": {
                              "rate": {
                                "base": {
                                  "amountBeforeTax": 299,
                                  "baseAmount": 299
                                },
                                "start": "2024-10-23",
                                "end": "2024-10-23"
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
                              "children": 1
                            },
                            "roomType": "KAIN",
                            "ratePlanCode": "IGCOR",
                            "marketCode": "Z",
                            "sourceCode": "GD",
                            "numberOfUnits":1,
                            "pseudoRoom": false,
                            "roomTypeCharged": "KAIN",
                            "start": "2024-10-23",
                            "end": "2024-10-23"
                          },
                          "guestCounts": {
                            "adults": 1,
                            "children": 1
                          },
                          "expectedTimes": {
                            "reservationExpectedArrivalTime": "2024-10-23",
                            "reservationExpectedDepartureTime": "2024-10-24"
                          },
                          "guarantee": {
                            "guaranteeCode": "INN",
                            "onHold": false
                          },
                          "arrivalDate": "2024-10-23",
                          "departureDate": "2024-10-24"
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
                  }

            )
            .expect(201)
            .expect('Content-Type', /json/)
            .then(function (response) {
                const locationHeader = response.headers.location;
                const urlParts = locationHeader.split('/');
                campaignId = urlParts[urlParts.length - 1];
                console.log("Campaign ID: ", campaignId);
            });
    });

    it('POST API Copy Reservation', async function ({ supertest }) {
       
        await supertest
            .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
            .post(`/rsv/v1/hotels/GRVZA/reservations/${campaignId}/copy`)
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
                        "id": campaignId  // use campaignId here
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
                                "start": "2024-08-25",
                                "end": "2024-08-25"
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
                            "start": "2024-08-25",
                            "end": "2024-08-25"
                          },
                          "guestCounts": {
                            "adults": 1,
                            "children": 0
                          },
                          "expectedTimes": {
                            "reservationExpectedArrivalTime": "2024-08-25",
                            "reservationExpectedDepartureTime": "2024-08-26"
                          },
                          "guarantee": {
                            "guaranteeCode": "INN"
                          },
                          "arrivalDate": "2024-08-25",
                          "departureDate": "2024-08-26"
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
                console.log(response);
            });
    });
});
