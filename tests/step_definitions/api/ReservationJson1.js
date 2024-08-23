const fs = require('fs');
const path = require('path');

let authToken1;
let authToken2;
let reservationId;
let confirmationId;
let externalReferenceId; 
let ihgConfirmationNumber;
let externalConfirmationNumber;
let pmsConfirmationNumber;

// Directly specify the absolute path
const jsonFilePath = 'C:/Users/User/Desktop/NewJson.json';

// Load the JSON data from the file
const testData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
console.log(testData)

// Set the arrival date to today or a future date
const currentDate = new Date();
const formattedArrivalDate = currentDate.toISOString().split('T')[0];

// Adjust departure date to be after the arrival date
const futureDepartureDate = new Date(currentDate);
futureDepartureDate.setDate(currentDate.getDate() + 1);
const formattedDepartureDate = futureDepartureDate.toISOString().split('T')[0];

describe('API Auth Token1', function () {
    const reservation = testData.reservation;
    it('GET AuthToken1', async function ({ supertest }) {
        await supertest
            .request(reservation.request)
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
            });
    });

    it('GET Check Availability', async function ({ supertest }) {
        await supertest
            .request(reservation.request)
            .get(reservation.Getendpath2)
            .query({
                "roomStayStartDate": formattedArrivalDate,
                "roomStayEndDate": formattedDepartureDate,
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
            .set('x-app-key', reservation['x-app-key1'])
            .set('bypass-routing', reservation['bypass-routing1'])
            .set('Authorization', 'Bearer ' + authToken1)
            .expect(200)
            .expect('Content-Type', /json/)
            .then(function (response) {
                // console.log(response)
            });
    })

    it('PUT Check Validation', async function ({ supertest }) {
        await supertest
            .request(reservation.request)
            .put(reservation.Putendpath)
            .set('Content-Type', reservation['Content-Type1'])
            .set('x-hotelid', reservation.hotelId)
            .set('x-app-key', reservation['x-app-key1'])
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
                                        "eventStartDate": formattedArrivalDate,
                                        "startDate": formattedArrivalDate,
                                        "start": formattedArrivalDate,
                                        "end": formattedDepartureDate,
                                        "endDate": formattedDepartureDate,
                                        "eventEndDate": formattedDepartureDate
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
                                "eventStartDate": formattedArrivalDate,
                                "startDate": formattedArrivalDate,
                                "start": formattedArrivalDate,
                                "end": formattedDepartureDate,
                                "endDate": formattedDepartureDate,
                                "eventEndDate": formattedDepartureDate
                            },
                            "guestCounts": {
                                "adults": reservation.adults,
                                "children": reservation.children
                            },
                            "expectedTimes": {
                                "reservationExpectedArrivalTime": formattedArrivalDate,
                                "resExpectedArrivalTime": formattedArrivalDate,
                                "reservationExpectedDepartureTime": formattedDepartureDate,
                                "resExpectedDepartureTime": formattedDepartureDate
                            },
                            "guarantee": {
                                "guaranteeCode": reservation.guaranteeCode
                            },
                            "arrivalDate": formattedArrivalDate,
                            "departureDate": formattedDepartureDate
                        },
                        "hotelId": reservation.hotelId,
                        "preRegistered": false,
                        "allowMobileCheckout": false,
                        "overrideOutOfServiceCheck": true
                    },
                    "timeSpan": {
                        "startDate": formattedArrivalDate,
                        "endDate": formattedDepartureDate
                    }
                }
            )
            .expect(200)
            .expect('Content-Type', /json/)
            .then(function (response) {
                // console.log(response)
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
            .set('Authorization', 'Bearer ' + authToken1)
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
                                        "start": formattedArrivalDate,
                                        "end": formattedDepartureDate
                                    }
                                },
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
                                "start": formattedArrivalDate,
                                "end": formattedDepartureDate
                            },
                            "guestCounts": {
                                "adults": reservation.adults,
                                "children": reservation.children
                            },
                            "expectedTimes": {
                                "reservationExpectedArrivalTime": formattedArrivalDate,
                                "reservationExpectedDepartureTime": formattedDepartureDate
                            },
                            "guarantee": {
                                "guaranteeCode": reservation.guaranteeCode,
                                "onHold": false
                            },
                            "arrivalDate": formattedArrivalDate,
                            "departureDate": formattedDepartureDate
                        },
                        "reservationGuests": {
                            "profileInfo": {
                                "profileIdList": {
                                    "type": "Profile",
                                    "id": reservation.profileId
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
                                            "id": 44137
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
            .set('Authorization', 'Bearer ' + authToken1)
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


    describe('Api Authu Token2', function () {
        it('GET AuthToken2', async function ({ supertest }) {
            await supertest
                .request(reservation.request1)
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
                    authToken2 = response.body.access_token;
                })
                .catch(function (error) {
                    console.error('Error in GET api test 2:', error);
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
                .set('Authorization', reservation.Authorization1)
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
                .catch(function (error) {
                    console.error('Error in Get api test 3:', error);
                });
        });

        it("PUT Update Reservation", async function ({ supertest }) {
                 await supertest
                .request(reservation.request)
                .put(reservation.Getendpath + reservationId)
                .set("Content-Type", reservation['Content-Type1'])
                .set("x-hotelid", reservation.hotelId)
                .set("x-app-key", reservation['x-app-key1'])
                .set("bypass-routing", reservation['bypass-routing'])
                .set("Authorization", "Bearer " + authToken1)
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
                                        eventStartDate: formattedArrivalDate,
                                        startDate: formattedArrivalDate,
                                        start: formattedArrivalDate,
                                        end: formattedDepartureDate,
                                        endDate: formattedDepartureDate,
                                        eventEndDate: formattedDepartureDate,
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
                                eventStartDate: formattedArrivalDate,
                                startDate: formattedArrivalDate,
                                start: formattedArrivalDate,
                                end: formattedDepartureDate,
                                endDate: formattedDepartureDate,
                                eventEndDate: formattedDepartureDate,
                            },
                            guestCounts: {
                                adults: reservation.adults,
                                children: reservation.children,
                            },
                            expectedTimes: {
                                reservationExpectedArrivalTime: formattedArrivalDate,
                                resExpectedArrivalTime: formattedArrivalDate,
                                reservationExpectedDepartureTime: formattedDepartureDate,
                                resExpectedDepartureTime: formattedDepartureDate,
                            },
                            guarantee: {
                                guaranteeCode: reservation.guaranteeCode,
                            },
                            promotion: "",
                            arrivalDate: formattedArrivalDate,
                            departureDate: formattedDepartureDate,
                        },
                        reservationGuests: {
                            profileInfo: {
                                profileIdList: {
                                    type: "Profile",
                                    idContext: "OPERA",
                                    id: 45387
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
                    console.log(response)
                });
        });
        it('GET Reservation OHIP1', async function ({ supertest }) {
            await supertest
              .request(reservation.request)
              .get(reservation.Getendpath + reservationId)
              .set('Content-Type', reservation['Content-Type1'])
              .set('x-hotelid', reservation.hotelId)
              .set('x-app-key', reservation['x-app-key1'])
              .set('bypass-routing', reservation['bypass-routing'])
              .set('Authorization', 'Bearer ' + authToken1)
              .expect(200)
              .expect('Content-Type', /json/)
              .then(function (response) {
                const responseData = response.body;
                // Extracting roomType from currentRoomInfo
                const roomTypeFromCurrentRoomInfo = responseData?.reservations?.reservation?.[0]?.roomStay?.currentRoomInfo?.roomType;
                console.log('Room Type :', roomTypeFromCurrentRoomInfo);
              })
              .catch(function (error) {
                console.error('Error in Get api test after login:', error);
              });
          });
          it('GET Reservation GRS1', async function ({ supertest }) {
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
              .set('Authorization', reservation.Authorization1)
              .expect(200)
              .expect('Content-Type', /json/)
              .then(function (response) {
                // console.log(response)
                const responseData = response.body;
                // Extracting the first inventoryTypeCode from productDefinitions array
                const productDefinitions = responseData?.hotelReservation?.productDefinitions;

                if (productDefinitions && productDefinitions.length > 0) {
                  const firstInventoryTypeCode = productDefinitions[0].inventoryTypeCode;
                  console.log('First Inventory Type Code:', firstInventoryTypeCode);
                } else {
                  console.log('No product definitions found.');
                }
              })
              .catch(function (error) {
                console.error('Error in Get api test 3:', error);
              });
          });
          it('POST Cancel Reservation', async function ({ supertest }) {
            await supertest
              .request(reservation.request)
              .post(reservation.Postendpath1)
              .set('Content-Type', reservation['Content-Type1'])
              .set('x-hotelid', reservation.hotelId)
              .set('x-app-key', reservation['x-app-key'])
              .set('bypass-routing', reservation['bypass-routing'])
              .set('Authorization', 'Bearer ' + authToken1)
              .send(
                {
                  "reason": {
                    "description": reservation.reason,
                    "code": reservation.reason
                  },
                  "reservations": [
                    {
                      "cxlInstr": {
                        "deleteResTraces": false
                      },
                      "reservationIdList": [
                        {
                          "type": "Reservation",
                          "id": reservationId
                        }
                      ],
                      "externalCancellationId": "1234",
                      "hotelId": reservation.hotelId,
                      "preRegistered": false,
                      "openFolio": false,
                      "allowMobileCheckout": false
                    },
                    {
                      "cxlInstr": {
                        "deleteResTraces": false
                      },
                      "reservationIdList": [
                        {
                          "type": "Reservation",
                          "id": reservationId
                        }
                      ],
                      "externalCancellationId": "1235",
                      "hotelId": reservation.hotelId,
                      "preRegistered": false,
                      "openFolio": false,
                      "allowMobileCheckout": false
                    }
                  ],
                  "verificationOnly": false
                }
              )
              .expect(201)
              .expect('Content-Type', /json/)
              .then(function (response) {
                // console.log(response)
                console.log("Status: Reservation cancelled Successfully");
              });
          });
          it('GET Reservation OHIP2', async function ({ supertest }) {
            await supertest
              .request(reservation.request)
              .get(reservation.Getendpath + reservationId)
              .set('Content-Type', reservation['Content-Type1'])
              .set('x-hotelid', reservation.hotelId)
              .set('x-app-key', reservation['x-app-key'])
              .set('bypass-routing', reservation['bypass-routing'])
              .set('Authorization', 'Bearer ' + authToken1)
              .expect(200)
              .expect('Content-Type', /json/)
              .then(function (response) {
                //console.log(response)
                const responseBody = response.body;
                const cancellationId = responseBody.reservations.reservation[0].cancellation.cancellationNo.id;
                const reservationStatus = responseBody.reservations.reservation[0].reservationStatus;
                console.log("Cancellation ID:", cancellationId);
                console.log("Reservation Status:", reservationStatus);
              })
              .catch(function (error) {
                console.error('Error in Get api test after login:', error);
              });
          });
          it('GET Reservation GRS2', async function ({ supertest }) {
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
              .set('Authorization', reservation.Authorization1)
              .expect(200)
              .expect('Content-Type', /json/)
              .then(function (response) {
              //  console.log(response)
              const data = response.body;
          
              const reservationStatus = data.hotelReservation?.reservationStatus;
              const cancellationNumber = data.hotelReservation?.reservationIds?.cancellationNumber;
              
              console.log('Reservation Status:', reservationStatus);
              console.log('Cancellation Number:', cancellationNumber);
               
              })
              .catch(function (error) {
                console.error('Error in Get api test 3:', error);
              });
        });
        });
    }); 
