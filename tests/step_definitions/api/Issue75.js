let authToken;
let campaignId;

describe('api Authu Token', function () {

    it('GET api test', async function ({ supertest }) {
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
    it('post api reservation', async function ({ supertest }) {
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
                                            "start": "2024-07-18",
                                            "end": "2024-07-18"
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
                                    "roomType": "TDBN",
                                    "ratePlanCode": "IGCOR",
                                    "marketCode": "Z",
                                    "sourceCode": "GD",
                                    "numberOfUnits": 1,
                                    "pseudoRoom": false,
                                    "roomTypeCharged": "TDBN",
                                    "start": "2024-07-18",
                                    "end": "2024-07-18"
                                },
                                "guestCounts": {
                                    "adults": 1,
                                    "children": 0
                                },
                                "expectedTimes": {
                                    "reservationExpectedArrivalTime": "2024-07-18",
                                    "reservationExpectedDepartureTime": "2024-07-19"
                                },
                                "guarantee": {
                                    "guaranteeCode": "INN",
                                    "onHold": false
                                },
                                "arrivalDate": "2024-07-18",
                                "departureDate": "2024-07-19"
                            },
                            "reservationGuests": {
                                "profileInfo": {
                                    "profileIdList": {
                                        "type": "Profile",
                                        "id": 53872
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
                                                "id": 53872
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
    it('Put api test after login', async function ({ supertest }) {
        await supertest
            .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
            .put("/rsv/v1/hotels/GRVZA/reservations/" + campaignId)
            .set('Content-Type', 'application/json')
            .set('x-hotelid', 'GRVZA')
            .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
            .set('bypass-routing', 'N')
            .set('Authorization', 'Bearer ' + authToken)
            .send(
                {
                    "reservations": [
                        {
                            "reservationIdList": [
                                {
                                    "type": "Reservation",
                                    "id": campaignId
                                }
                            ],
                            "roomStay": {
                                "roomRates": [
                                    {
                                        "rates": {
                                            "rate": [
                                                {
                                                    "base": {
                                                        "amountBeforeTax": "199",
                                                        "currencyCode": "USD"
                                                    },
                                                    "discount": {},
                                                    "requiredPoints": {},
                                                    "start": "2024-07-18",
                                                    "end": "2024-07-18"
                                                }
                                            ]
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
                                        "roomType": "TDBN",
                                        "ratePlanCode": "IGCOR",
                                        "marketCode": "Z",
                                        "sourceCode": "GD",
                                        "numberOfUnits": "2",
                                        "pseudoRoom": false,
                                        "roomTypeCharged": "TDBN",
                                        "fixedRate": true,
                                        "discountAllowed": false,
                                        "start": "2024-07-18",
                                        "end": "2024-07-18"
                                    }
                                ],
                                "guestCounts": {
                                    "adults": 1,
                                    "children": 0
                                },
                                "expectedTimes": {
                                    "reservationExpectedArrivalTime": "2024-07-18",
                                    "reservationExpectedDepartureTime": "2024-07-19"
                                },
                                "guarantee": {
                                    "guaranteeCode": "INN"
                                },
                                "arrivalDate": "2024-07-18",
                                "departureDate": "2024-07-19"
                            },
                            "reservationGuests": [
                                {
                                    "profileInfo": {
                                        "profileIdList": [
                                            {
                                                "type": "Profile",
                                                "id": "53872"
                                            }
                                        ],
                                        "profile": {
                                            "customer": {
                                                "personName": [
                                                    {
                                                        "givenName": "Mahavignesh",
                                                        "surname": "KP",
                                                        "nameType": "Primary",
                                                        "language": "EN"
                                                    },
                                                    {
                                                        "nameType": "Alternate"
                                                    }
                                                ],
                                                "identifications": {},
                                                "language": "EN"
                                            }
                                        },
                                        "profileCashieringDetail": {}
                                    }
                                },
                                {
                                    "profileInfo": {
                                        "profileIdList": [
                                            {
                                                "type": "Profile",
                                                "id": "53872"
                                            }
                                        ],
                                        "profile": {}
                                    },
                                    "primary": false
                                }
                            ],
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
                                        "reservationProfileType": "BillingContact"
                                    },
                                    {
                                        "reservationProfileType": "Addressee"
                                    }
                                ],
                                "commissionPayoutTo": "None"
                            },
                            "preferenceCollection": [],
                            "hotelId": "GRVZA",
                            "reservationStatus": "Reserved",
                            "customReference": "",
                            "preRegistered": false,
                            "allowMobileCheckout": false
                        }
                    ]
                }
            )
            .expect(200)
            .expect('Content-Type', /json/)
            .then(function (response) {
                console.log(response)
            });


        it('put api reservation', async function ({ supertest }) {
            await supertest
                .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
                .put(`/rsv/v1/reservations/${campaignId}/split`)
                .set('Content-Type', 'application/json')
                .set('x-hotelid', 'GRVZA')
                .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
                .set('bypass-routing', 'N')
                .set('Authorization', 'Bearer ' + authToken)
                .send(
                    {
                        "reservationId": {
                            "type": "Reservation",
                            "idContext": "OPERA",
                            "id": campaignId
                        },
                        "reservationPaymentMethods": {
                            "copyCreditCards": "true",
                            "copyOthers": "true",
                            "reservationPaymentMethod": {
                                "emailFolioInfo": {
                                    "emailFolio": "false"
                                },
                                "paymentMethod": "CASH",
                                "folioView": "1"
                            }
                        },
                        "responseInstructions": {
                            "fetchLinkedReservations": "false",
                            "fetchNewReservationIDs": "false"
                        },
                        "lockHandle": "0",
                        "splitAll": "false"

                    }

                )
                .expect(200)
                .expect('Content-Type', /json/)
                .then(function (response) {
                    console.log(response);
                });
        });
    });
})
