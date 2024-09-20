const fs = require('fs');
const XLSX = require('xlsx');
const supertest = require('supertest');


let authToken;
let authToken1;
let reservationId;
let reservationId1;
let confirmationId;
let externalReferenceId;
let pmsConfirmationNumber;
let externalConfirmationNumber;
let ihgConfirmationNumber;
let externalReferenceId1;
let excelData = [];

// Load the JSON data from the file
const jsonFilePath = 'C:/Users/User/Desktop/Demojson.json';
const testData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
//console.log(testData);
const reservation = testData.reservation;

describe('api Authu Token', function () {
    before(async function () {
        // Authenticate and set authToken before running tests 
        const reservation = testData.reservation;
        await supertest(reservation.request)
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
            });
       
        // Authenticate and set the second authToken before running tests
        await supertest(reservation.request1)
            .post(reservation.Authendpath1)
            .set('X-IHG-M2M', reservation['X-IHG-M2M'])
            .set('User-Agent', reservation['User-Agent'])
            .set('X-IHG-AUTO', reservation['X-IHG-AUTO'])
            .set('X-IHG-API-KEY', reservation['X-IHG-API-KEY'])
            .set('Authorization', reservation.Authorization1)
            .send({
                username: reservation.username,
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(function (response) {
                authToken1 = response.body.access_token;
            });

        it("Post API Create Reservation", async function({ supertest }) {
            await supertest
                 .request(reservation.request)
                .post(reservation.Postendpath)
                .set('Content-Type', reservation['Content-Type1'])
                .set('x-hotelid',  reservation.hotelId)
                .set('x-app-key', reservation['x-app-key'])
                .set('bypass-routing', reservation['bypass-routing'])
                .set('Authorization', 'Bearer ' + authToken)
                .send({
                    
                    "reservations": {
                        "reservation": [
                            {
                                "additionalGuestInfo": {
                                },
                                "allowMobileCheckout": false,
                                "cashiering": {
                                    "reverseAdvanceCheckInAllowed": false,
                                    "reverseCheckInAllowed": false,
                                    "taxType": {
                                        "code": "",
                                        "collectingAgentTax": false,
                                        "printAutoAdjust": false
                                    }
                                },
                                "comments": [
                                ],
                                "customReference": "",
                                "displayColor": "",
                                "hotelId": reservation.hotelId,
                                "markAsRecentlyAccessed": true,
                                "overrideInstructions": [
                                ],
                                "overrideOutOfServiceCheck": true,
                                "overrideRoomOwnership": false,
                                "preRegistered": false,
                                "reservationGuests": [
                                    {
                                        "arrivalTransport": {
                                        },
                                        "departureTransport": {
                                        },
                                        "profileInfo": {
                                            "profile": {
                                                "addresses": {
                                                    "addressInfo": [
                                                        {
                                                            "address": {
                                                                "addressLine": [
                                                                    "",
                                                                    "",
                                                                    "",
                                                                    ""
                                                                ],
                                                                "country": {
                                                                },
                                                                "isValidated": false,
                                                                "type": "HOME"
                                                            },
                                                            "id": "13371",
                                                            "idContext": "OPERA",
                                                            "type": "Address"
                                                        }
                                                    ]
                                                },
                                                "customer": {
                                                    "personName": [
                                                        {
                                                            "givenName": "Mahavignesh",
                                                            "nameType": "Primary",
                                                            "surname": "KP"
                                                        },
                                                        {
                                                            "nameType": "Alternate"
                                                        }
                                                    ]
                                                }
                                            },
                                            "profileCashieringDetail": {
                                            },
                                            "profileIdList": [
                                                {
                                                    "id": "55564",
                                                    "idContext": "OPERA",
                                                    "type": "Profile"
                                                }
                                            ]
                                        }
                                    }
                                ],
                                 "reservationPackages": [
                                {
                                    "endDate": "",
                                    "packageCode": "BRK",
                                    "source": "RateHeader",
                                    "startDate": ""
                                }
                            ],
                                "reservationPaymentMethods": [
                                    {
                                        "emailFolioInfo": {
                                            "emailFolio": false
                                        },
                                        "folioView": "1",
                                        "paymentMethod": "CASH"
                                    },
                                    {
                                        "emailFolioInfo": {
                                            "emailFolio": false
                                        },
                                        "folioView": "2"
                                    },
                                    {
                                        "emailFolioInfo": {
                                            "emailFolio": false
                                        },
                                        "folioView": "3"
                                    },
                                    {
                                        "emailFolioInfo": {
                                            "emailFolio": false
                                        },
                                        "folioView": "4"
                                    },
                                    {
                                        "emailFolioInfo": {
                                            "emailFolio": false
                                        },
                                        "folioView": "5"
                                    },
                                    {
                                        "emailFolioInfo": {
                                            "emailFolio": false
                                        },
                                        "folioView": "6"
                                    },
                                    {
                                        "emailFolioInfo": {
                                            "emailFolio": false
                                        },
                                        "folioView": "7"
                                    },
                                    {
                                        "emailFolioInfo": {
                                            "emailFolio": false
                                        },
                                        "folioView": "8"
                                    }
                                ],
                                "reservationProfiles": {
                                    "reservationProfile": [
                                        {
                                            "reservationProfileType": "Company",
                                            "resProfileType": "Company"
                                        },
                                        {
                                            "reservationProfileType": "Group",
                                            "resProfileType": "Group"
                                        },
                                        {
                                            "reservationProfileType": "TravelAgent",
                                            "resProfileType": "TravelAgent"
                                        },
                                        {
                                            "reservationProfileType": "ReservationContact",
                                            "resProfileType": "ReservationContact"
                                        },
                                        {
                                            "reservationProfileType": "Source",
                                            "resProfileType": "Source"
                                        },
                                        {
                                            "reservationProfileType": "Addressee",
                                            "resProfileType": "Addressee"
                                        }
                                    ],
                                    "resProfile": [
                                        {
                                            "reservationProfileType": "Company",
                                            "resProfileType": "Company"
                                        },
                                        {
                                            "reservationProfileType": "Group",
                                            "resProfileType": "Group"
                                        },
                                        {
                                            "reservationProfileType": "TravelAgent",
                                            "resProfileType": "TravelAgent"
                                        },
                                        {
                                            "reservationProfileType": "ReservationContact",
                                            "resProfileType": "ReservationContact"
                                        },
                                        {
                                            "reservationProfileType": "Source",
                                            "resProfileType": "Source"
                                        },
                                        {
                                            "reservationProfileType": "Addressee",
                                            "resProfileType": "Addressee"
                                        }
                                    ]
                                },
                                "reservationStatus": "Reserved",
                                "resGuests": [
                                    {
                                        "arrivalTransport": {
                                        },
                                        "departureTransport": {
                                        },
                                        "profileInfo": {
                                            "profile": {
                                                "addresses": {
                                                    "addressInfo": [
                                                        {
                                                            "address": {
                                                                "addressLine": [
                                                                    "",
                                                                    "",
                                                                    "",
                                                                    ""
                                                                ],
                                                                "country": {
                                                                },
                                                                "isValidated": false,
                                                                "type": "HOME"
                                                            },
                                                            "id": "13371",
                                                            "idContext": "OPERA",
                                                            "type": "Address"
                                                        }
                                                    ]
                                                },
                                                "customer": {
                                                    "personName": [
                                                        {
                                                            "givenName": "Mahavignesh",
                                                            "nameType": "Primary",
                                                            "surname": "KP"
                                                        },
                                                        {
                                                            "nameType": "Alternate"
                                                        }
                                                    ]
                                                }
                                            },
                                            "profileCashieringDetail": {
                                            },
                                            "profileIdList": [
                                                {
                                                    "id": "55564",
                                                    "idContext": "OPERA",
                                                    "type": "Profile"
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "resProfiles": {
                                    "reservationProfile": [
                                        {
                                            "reservationProfileType": "Company",
                                            "resProfileType": "Company"
                                        },
                                        {
                                            "reservationProfileType": "Group",
                                            "resProfileType": "Group"
                                        },
                                        {
                                            "reservationProfileType": "TravelAgent",
                                            "resProfileType": "TravelAgent"
                                        },
                                        {
                                            "reservationProfileType": "ReservationContact",
                                            "resProfileType": "ReservationContact"
                                        },
                                        {
                                            "reservationProfileType": "Source",
                                            "resProfileType": "Source"
                                        },
                                        {
                                            "reservationProfileType": "Addressee",
                                            "resProfileType": "Addressee"
                                        }
                                    ],
                                    "resProfile": [
                                        {
                                            "reservationProfileType": "Company",
                                            "resProfileType": "Company"
                                        },
                                        {
                                            "reservationProfileType": "Group",
                                            "resProfileType": "Group"
                                        },
                                        {
                                            "reservationProfileType": "TravelAgent",
                                            "resProfileType": "TravelAgent"
                                        },
                                        {
                                            "reservationProfileType": "ReservationContact",
                                            "resProfileType": "ReservationContact"
                                        },
                                        {
                                            "reservationProfileType": "Source",
                                            "resProfileType": "Source"
                                        },
                                        {
                                            "reservationProfileType": "Addressee",
                                            "resProfileType": "Addressee"
                                        }
                                    ]
                                },
                                "resStatus": "Reserved",
                                "roomStay": {
                                    "arrivalDate": reservation.arrivalDate,
                                    "departureDate": reservation.departureDate,
                                    "expectedTimes": {
                                        "reservationExpectedArrivalTime": reservation.arrivalDate,
                                        "reservationExpectedDepartureTime": reservation.departureDate,
                                        "resExpectedArrivalTime": reservation.arrivalDate,
                                        "resExpectedDepartureTime": reservation.departureDate
                                    },
                                    "guarantee": {
                                        "guaranteeCode": reservation.guaranteeCode,
                                        "onHold": false
                                    },
                                    "guestCounts": {
                                        "adults": 1,
                                        "children": 0
                                    },
                                    "roomRates": [
                                        {
                                            "end": reservation.startDate,
                                            "endDate": reservation.endDate,
                                            "eventEndDate": reservation.endDate,
                                            "eventStartDate": reservation.startDate,
                                            "guestCounts": {
                                                "adults": 1,
                                                "children": 0
                                            },
                                            "marketCode": "G",
                                            "numberOfUnits": "1",
                                            "pseudoRoom": false,
                                            "ratePlanCode": "IGCOR",
                                            "rates": {
                                                "rate": [
                                                    {
                                                        "base": {
                                                            "amountBeforeTax": "174",
                                                            "baseAmount": "174"
                                                        },
                                                        "discount": {
                                                        },
                                                        "end": reservation.endDate,
                                                        "endDate": reservation.endDate,
                                                        "eventEndDate": reservation.endDate,
                                                        "eventStartDate": reservation.startDate,
                                                        "requiredPoints": {
                                                        },
                                                        "start": reservation.startDate,
                                                        "startDate": reservation.startDate
                                                    }
                                                ]
                                            },
                                            "roomType": reservation.roomType,
                                            "roomTypeCharged": reservation.roomTypeCharged,
                                            "sourceCode": reservation.sourceCode,
                                            "start": reservation.startDate,
                                            "startDate": reservation.startDate,
                                            "stayProfiles": [
                                                {
                                                    "reservationProfileType": "Company",
                                                    "resProfileType": "Company"
                                                },
                                                {
                                                    "reservationProfileType": "Group",
                                                    "resProfileType": "Group"
                                                },
                                                {
                                                    "reservationProfileType": "TravelAgent",
                                                    "resProfileType": "TravelAgent"
                                                },
                                                {
                                                    "reservationProfileType": "ReservationContact",
                                                    "resProfileType": "ReservationContact"
                                                },
                                                {
                                                    "reservationProfileType": "BillingContact",
                                                    "resProfileType": "BillingContact"
                                                },
                                                {
                                                    "reservationProfileType": "Source",
                                                    "resProfileType": "Source"
                                                }
                                            ],
                                            "taxFreeGuestCounts": {
                                                "adults": 0,
                                                "children": 0
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                })
                .expect(201)
                .expect("Content-Type", /json/)
                .then(function (response) {
                    const locationHeader = response.headers.location;
                    const urlParts = locationHeader.split('/');
                    reservationId = urlParts[urlParts.length - 1];
                    console.log(`Reservation created successfully, Reservation ID: ${reservationId}`);
                })
            });

    it("GET Reservation OHIP", async function ({ supertest }) {
    await supertest
    .request(reservation.request)
    .get(reservation.Getendpath + reservationId)
    .set('Content-Type', reservation['Content-Type1'])
    .set('x-hotelid', reservation.hotelId)
    .set('x-app-key', reservation['x-app-key1'])
    .set('bypass-routing', reservation['bypass-routing'])
    .set('Authorization', 'Bearer ' + authToken)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(function (response) {
        const responseBody = JSON.parse(response.text);
        const reservation = responseBody.reservations.reservation[0];

        const confirmationIdEntry = reservation.reservationIdList.find(idEntry => idEntry.type === 'Confirmation');
         confirmationId = confirmationIdEntry ? confirmationIdEntry.id : 'Not found';

        const externalReferenceIdEntry = reservation.externalReferences.find(ref => ref.idContext === 'CRS_IHGSIT');
         externalReferenceId = externalReferenceIdEntry ? externalReferenceIdEntry.id : 'Not found';

        const arrivalDate = reservation.roomStay.arrivalDate || 'Not found';
         departureDate = reservation.roomStay.departureDate || 'Not found';
 
        console.log(`Status: Reservation retrieved successfully`);
        console.log(`Reservation ID: ${reservationId}`);
        console.log(`Confirmation ID: ${confirmationId}`);
        console.log('External Reference ID:', externalReferenceId);
        console.log(`Arrival Date: ${arrivalDate}`);
         console.log(`Departure Date: ${departureDate}`);
    })
});

it("GET Reservation GRS", async function ({ supertest }) {
        await supertest
            .request(reservation.request1)
            .get(reservation.Getendpath1 + externalReferenceId)
            .query({
                lastName: reservation.lastName
            })
            .set('Content-Length', '0')
            .set('X-IHG-M2M', reservation['X-IHG-M2M'])
            .set('User-Agent', reservation['User-Agent'])
            .set('X-IHG-AUTO', reservation['X-IHG-AUTO'])
            .set('X-IHG-API-KEY', reservation['X-IHG-API-KEY'])
            .set('bypass-routing', reservation['bypass-routing'])
            .set('Authorization', 'Bearer ' + authToken1)
            .expect(200)
            .expect('Content-Type', /json/)
            .then(function (response) {
                const responseBody = JSON.parse(response.text);
                const reservation = responseBody.hotelReservation;

                const ihgConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.ihgConfirmationNumber);
                ihgConfirmationNumber = ihgConfirmationNumberEntry ? ihgConfirmationNumberEntry.ihgConfirmationNumber : 'Not found';

                const externalConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.externalConfirmationNumber && entry.externalConfirmationNumber.number);
                externalConfirmationNumber = externalConfirmationNumberEntry ? externalConfirmationNumberEntry.externalConfirmationNumber.number : 'Not found';

                const pmsConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.pmsConfirmationNumber);
                pmsConfirmationNumber = pmsConfirmationNumberEntry ? pmsConfirmationNumberEntry.pmsConfirmationNumber : 'Not found';

                console.log("Status: Reservation created Successfully in GRS");
                console.log("IHG Confirmation Number:", ihgConfirmationNumber);
                console.log("External Confirmation Number:", externalConfirmationNumber);
                console.log("PMS Confirmation Number:", pmsConfirmationNumber);
            })
        });

    it("PUT Copy Reservation", async function ({ supertest }) {
        await supertest
            .request(reservation.request)
            .post(`/rsv/v1/hotels/GRVZA/reservations/${reservationId}/copy`)
            .set('Content-Type', reservation['Content-Type1'])
            .set('x-hotelid',  reservation.hotelId)
            .set('x-app-key', reservation['x-app-key'])
            .set('bypass-routing', reservation['bypass-routing'])
            .set('Authorization', 'Bearer ' + authToken)
            .send({
                  "criteria": {
                    "hotelId": reservation.hotelId,
                    "sourceReservationId": {
                      "type": "Reservation",
                      "id": reservationId
                    },
                    "newReservation": {
                      "reservationIdList": {
                        "type": "Confirmation",
                        "id": confirmationId
                      },
                      "roomStay": {
                        "roomRates": {
                          "rates": {
                            "rate": {
                              "base": {
                                "amountBeforeTax": 159,
                                "baseAmount": 159,
                                "currencyCode": "GBP"
                              },
                              "discount": "",
                              "requiredPoints": "",
                              "start": reservation.startDate,
                              "end": reservation.startDate
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
                          "roomType": reservation.roomType1,
                          "ratePlanCode": reservation.ratePlanCode,
                          "marketCode": "G",
                          "sourceCode": "GD",
                          "numberOfUnits": 1,
                          "pseudoRoom": false,
                          "roomTypeCharged": reservation.roomTypeCharged1,
                          "start": reservation.startDate,
                          "end": reservation.startDate
                        },
                        "guestCounts": {
                          "adults": 1,
                          "children": 0
                        },
                        "expectedTimes": {
                          "reservationExpectedArrivalTime": reservation.startDate,
                          "reservationExpectedDepartureTime": reservation.departureDate
                        },
                        "guarantee": {
                          "guaranteeCode": "INN"
                        },
                        "arrivalDate": reservation.startDate,
                        "departureDate": reservation.departureDate
                      },
                      "reservationGuests": {
                        "profileInfo": {
                          "profileIdList": {
                            "type": "Profile",
                            "id": 55564
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
                                  "country": "",
                                  "type": "HOME"
                                },
                                "type": "Address",
                                "id": 13371
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
                      "hotelId": reservation.hotelId,
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
                })
                .expect(200)
                .expect("Content-Type", /json/)
                .then(function (response) {
                    const locationHeader = response.headers.location;
                    const urlParts = locationHeader.split('/');
                    reservationId1 = urlParts[urlParts.length - 1];
                    console.log(`Reservation created successfully, Reservation ID: ${reservationId1}`)
                })
            });

    it("GET COPY RESERVATION OHIP", async function({ supertest }){
        await supertest
        .request(reservation.request)
        .get(reservation.Getendpath + reservationId1)
        .set('Content-Type', reservation['Content-Type1'])
        .set('x-hotelid', reservation.hotelId)
        .set('x-app-key', reservation['x-app-key1'])
        .set('bypass-routing', reservation['bypass-routing'])
        .set('Authorization', 'Bearer ' + authToken)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function (response) {
            const responseBody = JSON.parse(response.text);
            const reservation = responseBody.reservations.reservation[0];
    
            const confirmationIdEntry = reservation.reservationIdList.find(idEntry => idEntry.type === 'Confirmation');
            confirmationId = confirmationIdEntry ? confirmationIdEntry.id : 'Not found';
    
            const externalReferenceIdEntry = reservation.externalReferences.find(ref => ref.idContext === 'CRS_IHGSIT');
            externalReferenceId1 = externalReferenceIdEntry ? externalReferenceIdEntry.id : 'Not found';
    
            const arrivalDate = reservation.roomStay.arrivalDate || 'Not found';
            const departureDate = reservation.roomStay.departureDate || 'Not found';

            console.log(`Status: Reservation retrieved successfully`);
            console.log(`Reservation ID: ${reservationId1}`);
            console.log(`Confirmation ID: ${confirmationId}`);
            console.log(`External Reference ID: ${externalReferenceId1}`);
            console.log(`Arrival Date: ${arrivalDate}`);
             console.log(`Departure Date: ${departureDate}`);
        });
    });

    it("GET Copy Reservation GRS", async function ({ supertest }) {
        await supertest
            .request(reservation.request1)
            .get(reservation.Getendpath1 + externalReferenceId1)
            .query({
                lastName: reservation.lastName
            })
            .set('Content-Length', '0')
            .set('X-IHG-M2M', reservation['X-IHG-M2M'])
            .set('User-Agent', reservation['User-Agent'])
            .set('X-IHG-AUTO', reservation['X-IHG-AUTO'])
            .set('X-IHG-API-KEY', reservation['X-IHG-API-KEY'])
            .set('bypass-routing', reservation['bypass-routing'])
            .set('Authorization', 'Bearer ' + authToken1)
            .expect(200)
            .expect('Content-Type', /json/)
            .then(function (response) {
                const responseBody = JSON.parse(response.text);
                const reservation = responseBody.hotelReservation;

                const ihgConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.ihgConfirmationNumber);
                ihgConfirmationNumber = ihgConfirmationNumberEntry ? ihgConfirmationNumberEntry.ihgConfirmationNumber : 'Not found';

                const externalConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.externalConfirmationNumber && entry.externalConfirmationNumber.number);
                externalConfirmationNumber = externalConfirmationNumberEntry ? externalConfirmationNumberEntry.externalConfirmationNumber.number : 'Not found';

                const pmsConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.pmsConfirmationNumber);
                pmsConfirmationNumber = pmsConfirmationNumberEntry ? pmsConfirmationNumberEntry.pmsConfirmationNumber : 'Not found';

                console.log("Status: Reservation created Successfully in GRS");
                console.log("IHG Confirmation Number:", ihgConfirmationNumber);
                console.log("External Confirmation Number:", externalConfirmationNumber);
                console.log("PMS Confirmation Number:", pmsConfirmationNumber);
                excelData.push([reservationId, confirmationId,externalReferenceId,arrivalDate,departureDate]);
            })
        });

        after(function () {
            const path = require('path');
        
            // Define the file path
            const excelFilePath = path.join('C:/Users/Admin/Desktop/grveu.xlsx');
        
            // Ensure the directory exists
            const dir = path.dirname(excelFilePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        
            // Prepend headers to excelData
            const headers = ['Reservation ID', 'Confirmation ID', 'External Reference ID', 'startDate' , 'departureDate' ];
            excelData.unshift(headers);
        
            // Create a new workbook and a sheet from the data
            const ws = XLSX.utils.aoa_to_sheet(excelData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Reservation Data");
        
            // Save to Excel file
            XLSX.writeFile(wb, excelFilePath);
            console.log(`Data successfully written to ${excelFilePath}`);
        });
    });
});