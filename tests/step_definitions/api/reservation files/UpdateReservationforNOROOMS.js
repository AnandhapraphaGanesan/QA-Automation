let authToken;

describe('api Authu Token', function () {
  it('put api test', async function({supertest}) {
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
      .then(function(response){
        authToken=response._body.access_token;
      });
  });
});
it('Put api test after login', async function({supertest}) {
    await supertest
        .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
        .put("/rsv/v1/hotels/GRVZA/reservations/82145")
        .set('Content-Type', 'application/json')
        .set('x-hotelid', 'GRVZA')
        .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
        .set('bypass-routing', 'N')
        .set('Authorization', 'Bearer '+authToken)
        .send(
          {
            "reservations": {
                "responseInstructions": {
                  "confirmationOnly": true
                },
                "changeInstrunctions": {
                  "updatePackagePrice": false,
                  "changeAllShares": false,
                  "overrideInventory": true
                },
                "reservationIdList": {
                  "type": "Reservation",
                  "idContext": "OPERA",
                  "id": 82557
                },
                "roomStay": {
                  "currentRoomInfo": {
                    "roomType": "TDBN"
                  },
                  "roomRates": {
                    "rates": {
                      "rate": {
                        "base": {
                          "amountBeforeTax": 299,
                          "currencyCode": "USD"
                        },
                        "discount": "",
                        "eventStartDate": "2024-05-24",
                        "startDate": "2024-05-24",
                        "start": "2024-05-24",
                        "end": "2024-05-24",
                        "endDate": "2024-05-24",
                        "eventEndDate": "2024-05-24"
                      }
                    },
                    "stayProfiles": [
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
                        "resProfileType": "BillingContact",
                        "reservationProfileType": "BillingContact"
                      },
                      {
                        "resProfileType": "Source",
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
                    "roomType": "TDBN",
                    "ratePlanCode": "IGCOR",
                    "marketCode": "G",
                    "sourceCode": "T",
                    "numberOfUnits":100,
                    "roomId": "",
                    "pseudoRoom": false,
                    "roomTypeCharged": "TDBN",
                    "fixedRate": false,
                    "discountAllowed": true,
                    "eventStartDate": "2024-05-24",
                    "startDate": "2024-05-24",
                    "start": "2024-05-24",
                    "end": "2024-05-24",
                    "endDate": "2024-05-24",
                    "eventEndDate": "2024-05-24"
                  },
                  "guestCounts": {
                    "adults": 1,
                    "children": 0
                  },
                  "expectedTimes": {
                    "reservationExpectedArrivalTime": "2024-05-24",
                    "resExpectedArrivalTime": "2024-05-24",
                    "reservationExpectedDepartureTime": "2024-05-25",
                    "resExpectedDepartureTime": "2024-05-25"
                  },
                  "guarantee": {
                    "guaranteeCode": "INN"
                  },
                  "promotion": "",
                  "arrivalDate": "2024-05-24",
                  "departureDate": "2024-05-25"
                },
                "reservationGuests": {
                  "profileInfo": {
                    "profileIdList": {
                      "type": "Profile",
                      "idContext": "OPERA",
                      "id": 57900
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
                "additionalGuestInfo": "",
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
                "reservationCommunication": {
                  "telephones": {
                    "telephoneInfo": [
                      {
                        "telephone": {
                          "orderSequence": 1
                        }
                      },
                      {
                        "telephone": {
                          "orderSequence": 2
                        }
                      }
                    ]
                  },
                  "emails": {
                    "emailInfo": [
                      {
                        "email": {
                          "orderSequence": 1
                        }
                      },
                      {
                        "email": {
                          "orderSequence": 2
                        }
                      }
                    ]
                  }
                },
                "cashiering": {
                  "taxType": {
                    "code": 0,
                    "collectingAgentTax": false,
                    "printAutoAdjust": false
                  },
                  "reverseCheckInAllowed": false,
                  "reverseAdvanceCheckInAllowed": false
                },
                "userDefinedFields": {
                  "characterUDFs": {
                    "name": "UDFC01",
                    "value": "T"
                  }
                },
                "overrideInstructions": {
                  "date": "2024-05-07",
                  "type": "AVAILABILITY"
                },
                "hotelId": "GRVZA",
                "reservationStatus": "Reserved",
                "printRate": true,
                "customReference": "",
                "displayColor": "",
                "markAsRecentlyAccessed": true,
                "preRegistered": false,
                "allowMobileCheckout": false,
                "optedForCommunication": false,
                "overrideOutOfServiceCheck": true
            }
          }
        )
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function(response){
       //     console.log(response)
        });
  });