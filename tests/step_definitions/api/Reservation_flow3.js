const fs = require('fs');
const supertest = require('supertest');

let authToken;
let authToken1;
let reservationId;
let confirmationId;
let externalReferenceId;
let pmsConfirmationNumber;
let externalConfirmationNumber;
let ihgConfirmationNumber;


// Directly specify the absolute path
const jsonFilePath = 'C:/Users/User/Desktop/Demojson.json';
// Load the JSON data from the file
const testData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
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
        })
});

        const reservation = testData.reservation;
         //check availability
    it('GET Check Availability', async function ({ supertest }) {  
        await supertest
          .request(reservation.request)
          .get(reservation.Getendpath2)
          .query({
            "roomStayStartDate": reservation.startDate,
            "roomStayEndDate": reservation.endDate,
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
          .set('Authorization', 'Bearer ' + authToken)
          .expect(200)
          .expect('Content-Type', /json/)
          .then(function (response) {
            console.log("Check Availability Done Successfully")
          });
      })

      //check validation
    it('PUT Check Validation', async function ({ supertest }) {
        await supertest
          .request(reservation.request)
          .put(reservation.Putendpath)
          .set('Content-Type', reservation['Content-Type1'])
          .set('x-hotelid', reservation.hotelId)
          .set('x-app-key', reservation['x-app-key'])
          .set('bypass-routing', reservation['bypass-routing'])
          .set('Authorization', 'Bearer ' + authToken)
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
                    "eventStartDate":  reservation.startDate,
                    "startDate":  reservation.startDate,
                    "start":  reservation.startDate,
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
            console.log("Validation done Successfully")
          });
      });
      
        it('POST Create Reservation', async function ({ supertest }) {
            await supertest
                .request(reservation.request)
                .post(reservation.Postendpath)
                .set('Content-Type', reservation['Content-Type1'])
                .set('x-hotelid', reservation.hotelId)
                .set('x-app-key', reservation['x-app-key1'])
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
                                                        "start": reservation.startDate,
                                                        "end": reservation.endDate
                                                    }
                                                }
                                            ],
                                            "stayProfiles": [
                                                { "reservationProfileType": "Company" },
                                                { "reservationProfileType": "Group" },
                                                { "reservationProfileType": "TravelAgent" },
                                                { "reservationProfileType": "ReservationContact" },
                                                { "reservationProfileType": "BillingContact" },
                                                { "reservationProfileType": "Source" }
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
                                        }
                                    ],
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
                                            "id":"53872"
                                        },
                                        "profile": {
                                            "customer": {
                                                "personName": [
                                                    {
                                                        "givenName": reservation.givenName,
                                                        "surname": reservation.lastName,
                                                        "nameType": "Primary"
                                                    },
                                                    { "nameType": "Alternate" }
                                                ]
                                            },
                                            "addresses": {
                                                "addressInfo": {
                                                    "address": {
                                                        "isValidated": false,
                                                        "addressLine": ["", "", "", ""],
                                                        "country": { "code": "US" },
                                                        "type": "HOME"
                                                    },
                                                    "type": "Address",
                                                    "id":"48582"
                                                }
                                            }
                                        }
                                    }
                                },
                                "reservationProfiles": {
                                    "reservationProfile": [
                                        { "reservationProfileType": "Company" },
                                        { "reservationProfileType": "Group" },
                                        { "reservationProfileType": "TravelAgent" },
                                        { "reservationProfileType": "ReservationContact" },
                                        { "reservationProfileType": "Source" },
                                        { "reservationProfileType": "Addressee" }
                                    ]
                                },
                                "reservationPaymentMethods": [
                                    { "emailFolioInfo": { "emailFolio": false }, "paymentMethod": reservation.paymentMethod, "folioView": 1 },
                                    { "emailFolioInfo": { "emailFolio": false }, "folioView": 2 },
                                    { "emailFolioInfo": { "emailFolio": false }, "folioView": 3 },
                                    { "emailFolioInfo": { "emailFolio": false }, "folioView": 4 },
                                    { "emailFolioInfo": { "emailFolio": false }, "folioView": 5 },
                                    { "emailFolioInfo": { "emailFolio": false }, "folioView": 6 },
                                    { "emailFolioInfo": { "emailFolio": false }, "folioView": 7 },
                                    { "emailFolioInfo": { "emailFolio": false }, "folioView": 8 }
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
                    const locationHeader = response.headers.location;
                    const urlParts = locationHeader.split('/');
                    reservationId = urlParts[urlParts.length - 1];
                    console.log("Reservation created successfully, Reservation ID:", reservationId);
                });
        });

        it('GET Reservation OHIP', async function ({ supertest }) {
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

                    console.log("Status : Reservation created Successfully in OHIP");
                    console.log("Reservation ID :", reservationId);
                    console.log('Confirmation ID:', confirmationId);
                    console.log('External Reference ID:', externalReferenceId);
                })
        });

        it('GET Reservation GRS', async function ({ supertest }) {
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
                    //console.log(response)
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

    it("PUT Update Reservation", async function ({ supertest }) {
        await supertest
       .request(reservation.request)
       .put(reservation.Getendpath + reservationId)
       .set("Content-Type", reservation['Content-Type1'])
       .set("x-hotelid", reservation.hotelId)
       .set("x-app-key", reservation['x-app-key'])
       .set("bypass-routing", reservation['bypass-routing'])
       .set("Authorization", "Bearer " + authToken)
       .send({
           reservations: {
               responseInstructions: {
                   confirmationOnly: true,
               },
               changeInstrunctions: {
                   updatePackagePrice: false,
                   changeAllShares: false,
                   overrideInventory: false,
               },
               reservationIdList: {
                   type: "Reservation",
                   idContext: "OPERA",
                   id: reservationId,
               },
               roomStay: {
                   currentRoomInfo: {
                       roomType: reservation.roomType1,
                   },
                   roomRates: {
                       rates: {
                           rate: {
                               base: {
                                   amountBeforeTax: 299,
                                   currencyCode: "USD",
                               },
                               discount: "",
                               eventStartDate: reservation.startDate,
                               startDate: reservation.startDate,
                               start: reservation.startDate,
                               end: reservation.endDate,
                               endDate: reservation.endDate,
                               eventEndDate: reservation.endDate,
                           },
                       },
                       stayProfiles: [
                           {
                               resProfileType: "Company",
                               reservationProfileType: "Company",
                           },
                           {
                               resProfileType: "Group",
                               reservationProfileType: "Group",
                           },
                           {
                               resProfileType: "TravelAgent",
                               reservationProfileType: "TravelAgent",
                           },
                           {
                               resProfileType: "ReservationContact",
                               reservationProfileType: "ReservationContact",
                           },
                           {
                               resProfileType: "BillingContact",
                               reservationProfileType: "BillingContact",
                           },
                           {
                               resProfileType: "Source",
                               reservationProfileType: "Source",
                           },
                       ],
                       guestCounts: {
                           adults: reservation.adults,
                           children: reservation.children,
                       },
                       taxFreeGuestCounts: {
                           adults: 0,
                           children: 0,
                       },
                       roomType: reservation.roomType1,
                       ratePlanCode: reservation.ratePlanCode,
                       marketCode: reservation.marketCode,
                       sourceCode: reservation.sourceCode,
                       numberOfUnits: reservation.numberOfUnits,
                       roomId: "",
                       pseudoRoom: false,
                       roomTypeCharged: reservation.roomTypeCharged1,
                       fixedRate: true,
                       discountAllowed: true,
                       eventStartDate: reservation.startDate,
                       startDate: reservation.startDate,
                       start: reservation.startDate,
                       end: reservation.endDate,
                       endDate: reservation.endDate,
                       eventEndDate: reservation.endDate,
                   },
                   guestCounts: {
                       adults: reservation.adults,
                       children: reservation.children,
                   },
                   expectedTimes: {
                       reservationExpectedArrivalTime: reservation.arrivalDate,
                       resExpectedArrivalTime: reservation.arrivalDate,
                       reservationExpectedDepartureTime: reservation.departureDate,
                       resExpectedDepartureTime: reservation.departureDate,
                   },
                   guarantee: {
                       guaranteeCode: reservation.guaranteeCode,
                   },
                   promotion: "",
                   arrivalDate: reservation.arrivalDate,
                   departureDate: reservation.departureDate,
               },
               reservationGuests: {
                   profileInfo: {
                       profileIdList: {
                           type: "Profile",
                           idContext: "OPERA",
                           id: "53872"
                       },
                       profile: {
                           customer: {
                               personName: [
                                   {
                                       givenName: reservation.givenName,
                                       surname: reservation.lastName,
                                       nameType: "Primary",
                                   },
                                   {
                                       nameType: "Alternate",
                                   },
                               ],
                           },
                       },
                   },
                   arrivalTransport: {
                       transportationReqd: false,
                   },
                   departureTransport: {
                       transportationReqd: false,
                   },
               },
               additionalGuestInfo: "",
               reservationProfiles: {
                   reservationProfile: [
                       {
                           reservationProfileType: "Company",
                       },
                       {
                           reservationProfileType: "Group",
                       },
                       {
                           reservationProfileType: "TravelAgent",
                       },
                       {
                           reservationProfileType: "ReservationContact",
                       },
                       {
                           reservationProfileType: "Source",
                       },
                       {
                           reservationProfileType: "BillingContact",
                       },
                       {
                           reservationProfileType: "Addressee",
                       },
                   ],
                   commissionPayoutTo: "None",
               },
               reservationCommunication: {
                   telephones: {
                       telephoneInfo: [
                           {
                               telephone: {
                                   orderSequence: 1,
                               },
                           },
                           {
                               telephone: {
                                   orderSequence: 2,
                               },
                           },
                       ],
                   },
                   emails: {
                       emailInfo: [
                           {
                               email: {
                                   orderSequence: 1,
                               },
                           },
                           {
                               email: {
                                   orderSequence: 2,
                               },
                           },
                       ],
                   },
               },
               cashiering: {
                   taxType: {
                       code: 0,
                       collectingAgentTax: false,
                       printAutoAdjust: false,
                   },
                   reverseCheckInAllowed: false,
                   reverseAdvanceCheckInAllowed: false,
               },
               userDefinedFields: {
                   characterUDFs: {
                       name: "UDFC01",
                       value: "T",
                   },
               },
               hotelId: reservation.hotelId,
               reservationStatus: "Reserved",
               printRate: true,
               customReference: "",
               displayColor: "",
               markAsRecentlyAccessed: true,
               preRegistered: false,
               allowMobileCheckout: false,
               optedForCommunication: false,
               overrideOutOfServiceCheck: true,
           },
       })
       .expect(200)
       .expect("Content-Type", /json/)
       .then(function (response) {
        console.log("Update Reservation Done Successfully")
       });
});

it('GET Reservation OHIP', async function ({ supertest }) {
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

            console.log("Status : Reservation created Successfully in OHIP");
            console.log("Reservation ID :", reservationId);
            console.log('Confirmation ID:', confirmationId);
            console.log('External Reference ID:', externalReferenceId);
        })
});

it('GET Reservation GRS', async function ({ supertest }) {
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

 it('PUT Reinstate Reservation', async function({supertest}) {
    await supertest
        .request(reservation.request)
        .put(`/rsv/v1/hotels/GRVZA/reservations/${reservationId}/cancellations`)
        .set('Content-Type', reservation['Content-Type1'])
        .set('x-hotelid', reservation.hotelId)
        .set('x-app-key', reservation['x-app-key1'])
        .set('bypass-routing', reservation['bypass-routing'])
        .set('Authorization', 'Bearer ' + authToken)
        .send(
          {
            "reservationIdList": {
                "type": "Reservation",
                "id": reservationId
              },
              "hotelId": reservation.hotelId
            })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function(response){
            console.log("Status: Reinstate Reservation done successfully");
        });
    });

    it('GET Reservation GRS', async function ({ supertest }) {
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

                const pmsStatus = reservation.segments[0].pmsStatus || 'Not found';

                console.log("PMS Status:", pmsStatus);
                console.log("Status: Reservation created Successfully in GRS");
                console.log("IHG Confirmation Number:", ihgConfirmationNumber);
                console.log("External Confirmation Number:", externalConfirmationNumber);
                console.log("PMS Confirmation Number:", pmsConfirmationNumber);
            })
    });
});

