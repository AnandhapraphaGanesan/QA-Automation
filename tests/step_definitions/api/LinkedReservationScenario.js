// const res = require('express/lib/response');
const fs = require('fs');
// const { request } = require('http');
//const XLSX = require('xlsx');
const supertest = require('supertest');

let authToken1;
let reservationIds = [];
//let excelData = [];

// Load the JSON data from the file
const jsonFilePath = 'C:/Users/User/Desktop/NewJson.json';
const testData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
console.log(testData);

describe('Api Auth Token1', function () {
    const reservation = testData.reservation;
    before(async function () {
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
                authToken1 = response._body.access_token;
                console.log(response);
            });
    })

    it('GET Check Availability', async function ({ supertest }) {
         await supertest
        .request(reservation.request)
        .get(reservation.Getendpath2)
        .query({
          "roomStayStartDate": reservation.arrivalDate,
          "roomStayEndDate": reservation.departureDate,
          "hotelIds": reservation.hotelId,
          "children": reservation.children,
          "roomTypeInfo": true,
          "adults": reservation.adults,
          "ratePlanInfo": true,
          "limit": reservation.limit,
          "redeemAwards": false,
          "roomStayQuantity": reservation.roomStayQuantity,
          "initialRatePlanSet": true,
          "resGuaranteeInfo": false
        })
        .set('Content-Type', reservation['Content-Type1'])
        .set('x-hotelid', reservation.hotelId)
        .set('x-app-key', reservation['x-app-key'])
        .set('bypass-routing', reservation['bypass-routing1'])
        .set('Authorization', 'Bearer ' + authToken1)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function (response) {
          // console.log(response)
        });
    })

    //check validation
    it('PUT Check Validation', async function ({ supertest }) {
      // Format depatureDate to string
      await supertest
        .request(reservation.request)
        .put(reservation.Putendpath)
        .set('Content-Type', reservation['Content-Type1'])
        .set('x-hotelid', reservation.hotelId)
        .set('x-app-key', reservation['x-app-key'])
        .set('bypass-routing', reservation['bypass-routing'])
        .set('Authorization', 'Bearer ' + authToken1)
        .send(
          {
            "instructions": {
              "instruction": [
                "Packages",
                "InventoryItems",
                "ReservationGuarantee",
                "StayHeader",
                "RefreshRates"
              ]
            },
            "reservation": {
              "roomStay": {
                "roomRates": {
                  "rates": {
                    "rate": {
                      "base": {
                        "amountBeforeTax": 179,
                        "baseAmount": 179,
                        "currencyCode": "USD"
                      },
                      "discount": "",
                      "eventStartDate": reservation.startDate,
                      "startDate": reservation.startDate,
                      "start": reservation.startDate,
                      "end": reservation.endDate,
                      "endDate": reservation.endDate,
                      "eventEndDate": reservation.endDate
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
                    "adults": reservation.adults,
                    "children": reservation.children
                  },
                  "taxFreeGuestCounts": {
                    "adults": 0,
                    "children": 0
                  },
                  "roomType": reservation.roomType,
                  "ratePlanCode": reservation.ratePlanCode,
                  "marketCode": reservation.marketCode,
                  "sourceCode": reservation.sourceCode,
                  "numberOfUnits": reservation.numberOfUnits,
                  "pseudoRoom": false,
                  "roomTypeCharged": reservation.roomTypeCharged,
                  "eventStartDate": reservation.startDate,
                  "startDate": reservation.startDate,
                  "start": reservation.startDate,
                  "end": reservation.endDate,
                  "endDate": reservation.endDate,
                  "eventEndDate": reservation.endDate
                },
                "guestCounts": {
                  "adults": reservation.adults,
                  "children": reservation.children
                },
                "expectedTimes": {
                  "reservationExpectedArrivalTime": reservation.arrivalDate,
                  "resExpectedArrivalTime": reservation.arrivalDate,
                  "reservationExpectedDepartureTime": reservation.departureDate,
                  "resExpectedDepartureTime": reservation.departureDate
                },
                "guarantee": {
                  "guaranteeCode": reservation.guaranteeCode
                },
                "arrivalDate": reservation.arrivalDate,
                "departureDate": reservation.departureDate
              },
              "hotelId": reservation.hotelId,
              "preRegistered": false,
              "allowMobileCheckout": false,
              "overrideOutOfServiceCheck": true
            },
            "timeSpan": {
              "startDate": reservation.startDate,
              "endDate": reservation.endDate
            }
          }
        )
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function (response) {
          // console.log(response)
        });
        

    })

    for (let i = 0; i < 2; i++) {
        it(`Post API Test After Login - Iteration ${i + 1}`, async function({ supertest }) {
        
        await supertest
          .request(reservation.request)
          .post(reservation.Postendpath)
          .set('Content-Type', reservation['Content-Type1'])
          .set('x-hotelid', reservation.hotelId)
          .set('x-app-key', reservation['x-app-key'])
          .set('bypass-routing', reservation['bypass-routing'])
          .set('Authorization', 'Bearer ' + authToken1)
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
                          "start": reservation.startDate,
                          "end": reservation.endDate
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
                        "adults": reservation.adults,
                        "children": reservation.children
                      },
                      "roomType": reservation.roomType,
                      "ratePlanCode":reservation.ratePlanCode,
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
                      "reservationExpectedArrivalTime":  reservation.arrivalDate,
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
                              "givenName": reservation.givenName,
                              "surname": reservation.lastName,
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
                      "paymentMethod": reservation.paymentMethod,
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
            }
          )
          .expect(201)
          .expect('Content-Type', /json/)
          .then(function (response) {
              const locationHeader = response.headers.location;
              const urlParts = locationHeader.split('/');
              const reservationId = urlParts[urlParts.length - 1];
              reservationIds.push(reservationId); // Store each reservation ID
              console.log(`Reservation created successfully, Reservation ID ${i + 1}:`, reservationId);
          })
          .catch(function (error) {
              console.error('Error in POST request:', error);
          });
      });
   
   
    }
    
    after(async function () {
        const reservationId1 = reservationIds[0]; // First looped reservation ID
        const reservationId2 = reservationIds[1]; // Second looped reservation ID
          await supertest(reservation.request)
          // .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
    .post("/rsv/v1/reservations/linkedReservations/"+ reservationId2)
    .set("Content-Type", "application/json")
    .set("x-hotelid", "GRVZA")
    .set("x-app-key", "69594b78-9894-4914-a894-860ca6d056db")
    .set("bypass-routing", "N")
    .set("Authorization", "Bearer " + authToken1)
    .send({
      reservationIdList: [
        {
          type: "Reservation",
          id: reservationId1,
        },
      ],
      linkToReservationId: {
        type: "Reservation",
        id:  reservationId2,
      },
      "responseInstruction": {
        "fetchLinkedReservations": true
      }
    })
    .expect(201)
    .expect("Content-Type", /json/)
    .then(function (response) {
      console.log(response);
   })

    });
   });






