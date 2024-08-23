describe("api Authu Token", function () {
    it("AuthToken1 ", async function ({ supertest }) {
      await supertest
      .request("https://ihgce1ua.hospitality-api.eu-frankfurt-1.ocs.oc-test.com")
      .post("/oauth/v1/tokens")
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('x-app-key', '028ab184-754f-4b0b-aae0-3202ae9f54a1')
      .set('Authorization', 'Basic Og==')
    .send({
        username: 'IHGGEU_CRS',
        password: 'K$9j1248zA1kD2o823M3Ks^8',
        grant_type: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function(response){
        authToken1=response._body.access_token;
      });
  });

    it("post api test after login", async function ({ supertest }) {
        await supertest
          .request("https://ihgce1ua.hospitality-api.eu-frankfurt-1.ocs.oc-test.com")
          .post("/rsv/v1/hotels/GRVEU/reservations")
          .set("Content-Type", "application/json")
          .set("x-hotelid", "GRVEU")
          .set("x-app-key", "028ab184-754f-4b0b-aae0-3202ae9f54a1")
          .set("bypass-routing", "N")
          .set("Authorization", "Bearer " + authToken1)
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
                            "hotelId": "GRVEU",
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
                                                "id": "27331",
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
                                                "id": "27331",
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
                                "arrivalDate": "2024-08-22",
                                "departureDate": "2024-08-23",
                                "expectedTimes": {
                                    "reservationExpectedArrivalTime": "2024-08-22",
                                    "reservationExpectedDepartureTime": "2024-08-23",
                                    "resExpectedArrivalTime": "2024-08-22",
                                    "resExpectedDepartureTime": "2024-08-23"
                                },
                                "guarantee": {
                                    "guaranteeCode": "INN",
                                    "onHold": false
                                },
                                "guestCounts": {
                                    "adults": 1,
                                    "children": 0
                                },
                                "roomRates": [
                                    {
                                        "end": "2024-08-22",
                                        "endDate": "2024-08-22",
                                        "eventEndDate": "2024-08-22",
                                        "eventStartDate": "2024-08-22",
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
                                                    "end": "2024-08-22",
                                                    "endDate": "2024-08-22",
                                                    "eventEndDate": "2024-08-22",
                                                    "eventStartDate": "2024-08-22",
                                                    "requiredPoints": {
                                                    },
                                                    "start": "2024-08-22",
                                                    "startDate": "2024-08-22"
                                                }
                                            ]
                                        },
                                        "roomType": "O1KN",
                                        "roomTypeCharged": "O1KN",
                                        "sourceCode": "GD",
                                        "start": "2024-08-22",
                                        "startDate": "2024-08-22",
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
            console.log("Reservation created successfully, Reservation ID:", reservationId);
        })
        .catch(function (error) {
            console.error('Error in post api test after login for reservation:', error);
        });
    });

    it('Get api test after login', async function({supertest}) {
        await supertest
          .request("https://ihgce1ua.hospitality-api.eu-frankfurt-1.ocs.oc-test.com")
          .get("/rsv/v1/hotels/GRVEU/reservations/"+reservationId)
          .set('Content-Type', 'application/json')
          .set('x-hotelid', 'GRVEU')
          .set('x-app-key', '028ab184-754f-4b0b-aae0-3202ae9f54a1')
          .set('bypass-routing', 'N')
          .set('Authorization', 'Bearer '+authToken1)
          .expect(200)
            .expect('Content-Type', /json/)
            .then(function (response) {
                const responseBody = JSON.parse(response.text);
                const reservation = responseBody.reservations.reservation[0];

                const confirmationIdEntry = reservation.reservationIdList.find(idEntry => idEntry.type === 'Confirmation');
                confirmationId = confirmationIdEntry ? confirmationIdEntry.id : 'Not found';

                const externalReferenceIdEntry = reservation.externalReferences.find(ref => ref.idContext === 'CRS_IHGGEU');
                externalReferenceId = externalReferenceIdEntry ? externalReferenceIdEntry.id : 'Not found';

                console.log("Status : Reservation created Successfully in OHIP");
                console.log("Reservation ID :", reservationId);
                console.log('Confirmation ID:', confirmationId);
                console.log('External Reference ID:', externalReferenceId);
            })
            .catch(function (error) {
                console.error('Error in Get api test after login:', error);
            });
    });
});