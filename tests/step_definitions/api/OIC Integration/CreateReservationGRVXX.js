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
        username: 'HIEUAT_OIC2',
        password: 'M2sTdBbk3WtGKF5AhzSxPu4YyV!',
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
      .post("/rsv/v1/hotels/GRVXX/reservations")
      .set('Content-Type', 'application/json')
      .set('x-hotelid', 'GRVXX')
      .set('x-app-key', '1639912d-392a-473b-ad6f-272421e24849')
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
                                        "amountBeforeTax": "204",
                                        "baseAmount": "204"
                                    },
                                    "start": "2024-08-05",
                                    "end": "2024-08-05"
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
                                "adults": "1",
                                "children": "0"
                            },
                            "roomType": "KNGN",
                            "ratePlanCode": "IKPCM",
                            "marketCode": "K",
                            "sourceCode": "GD",
                            "numberOfUnits": "1",
                            "pseudoRoom": "false",
                            "roomTypeCharged": "KNGN",
                            "start": "2024-08-05",
                            "end": "2024-08-05"
                        },
                        "guestCounts": {
                            "adults": "1",
                            "children": "0"
                        },
                        "expectedTimes": {
                            "reservationExpectedArrivalTime": "2024-08-05",
                            "reservationExpectedDepartureTime": "2024-08-06"
                        },
                        "guarantee": {
                            "guaranteeCode": "INN",
                            "onHold": "false"
                        },
                        "arrivalDate": "2024-08-05",
                        "departureDate": "2024-08-06"
                    },
                    "reservationGuests": {
                        "profileInfo": {
                            "profileIdList": {
                                "type": "Profile",
                                "id": "55519"
                            },
                            "profile": {
                                "customer": {
                                    "personName": [
                                        {
                                            "givenName": "Mahavignesh",
                                            "surname": "KP",
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
                                            "isValidated": "false",
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
                                        "id": "51206"
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
                                "emailFolio": "false"
                            },
                            "paymentMethod": "CASH",
                            "folioView": "1"
                        },
                        {
                            "emailFolioInfo": {
                                "emailFolio": "false"
                            },
                            "folioView": "2"
                        },
                        {
                            "emailFolioInfo": {
                                "emailFolio": "false"
                            },
                            "folioView": "3"
                        },
                        {
                            "emailFolioInfo": {
                                "emailFolio": "false"
                            },
                            "folioView": "4"
                        },
                        {
                            "emailFolioInfo": {
                                "emailFolio": "false"
                            },
                            "folioView": "5"
                        },
                        {
                            "emailFolioInfo": {
                                "emailFolio": "false"
                            },
                            "folioView": "6"
                        },
                        {
                            "emailFolioInfo": {
                                "emailFolio": "false"
                            },
                            "folioView": "7"
                        },
                        {
                            "emailFolioInfo": {
                                "emailFolio": "false"
                            },
                            "folioView": "8"
                        }
                    ],
                    "cashiering": {
                        "taxType": {
                        },
                        "reverseCheckInAllowed": "false",
                        "reverseAdvanceCheckInAllowed": "false"
                    },
                    "hotelId": "GRVXX",
                    "reservationStatus": "Reserved",
                    "customReference": "",
                    "displayColor": "",
                    "markAsRecentlyAccessed": "true",
                    "preRegistered": "false",
                    "allowMobileCheckout": "false",
                    "overrideOutOfServiceCheck": "true"
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
// it('Get api test after login', async function ({ supertest }) {
//   await supertest
//     .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
//     .get("/rsv/v1/hotels/GRVZA/reservations/93065")
//     .set('Content-Type', 'application/json')
//     .set('x-hotelid', 'GRVZA')
//     .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
//     .set('bypass-routing', 'Y')
//     .set('Authorization', 'Bearer ' + authToken)
//     .expect(200)
//     .expect('Content-Type', /json/)
//     .then(function (response) {
//       console.log(response)
//     });
// });
