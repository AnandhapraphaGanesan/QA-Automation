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
                                "roomRates": {
                                    "rates": {
                                        "rate": {
                                            "base": {
                                                "amountBeforeTax": 299,
                                                "baseAmount": 299
                                            },
                                            "start": "2024-06-07",
                                            "end": "2024-06-07"
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
                                    "roomType": "KAIN",
                                    "ratePlanCode": "IGCOR",
                                    "marketCode": "Z",
                                    "sourceCode": "GD",
                                    "numberOfUnits": 1,
                                    "pseudoRoom": false,
                                    "roomTypeCharged": "KAIN",
                                    "start": "2024-06-07",
                                    "end": "2024-06-07"
                                },
                                "guestCounts": {
                                    "adults": 1,
                                    "children": 0
                                },
                                "expectedTimes": {
                                    "reservationExpectedArrivalTime": "2024-06-07",
                                    "reservationExpectedDepartureTime": "2024-06-08"
                                },
                                "guarantee": {
                                    "guaranteeCode": "CC",
                                    "onHold": false
                                },
                                "arrivalDate": "2024-06-07",
                                "departureDate": "2024-06-08"
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
                                    "paymentmethod":"AX",
                                    "folioView":"1"
                                },
                               {
                                    "paymentCard": {
                                        "cardType": "AX",
                                        "cardNumber": "373344556677889",
                                        "cardNumberMasked": "XXXXXXXXXXXX0149",
                                        "expirationDate": "2029-11-30",
                                        "storeToCreditCardWallet": "false"
                                    },
                                    "emailFolioInfo": {
                                        "emailFolio": "false"
                                    },
                                    "paymentMethod": "AX",
                                    "folioView": "1"
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