
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
        .put("/rsv/v1/hotels/GRVZA/reservations/86471")
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
                "overrideInventory": false
              },
              "reservationIdList": {
                "type": "Reservation",
                "idContext": "OPERA",
                "id": 86471
              },
              "roomStay": {
                "currentRoomInfo": {
                  "roomType": "KNGN"
                },
                "roomRates": [             
                  {
                    "rates": {
                      "rate": {
                        "base": {
                          "amountBeforeTax": 299,
                          "currencyCode": "USD"
                        },
                        "discount": "",
                        "eventStartDate": "2024-06-15",
                        "startDate": "2024-06-15",
                        "start": "2024-06-15",
                        "end": "2024-06-15",
                        "endDate": "2024-06-15",
                        "eventEndDate": "2024-06-15"
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
                    "roomType": "KNGN",
                    "ratePlanCode": "IGCOR",
                    "marketCode": "Z",
                    "sourceCode": "GD",
                    "numberOfUnits": 1,
                    "roomId": "",
                    "pseudoRoom": false,
                    "roomTypeCharged": "KNGN",
                    "fixedRate": true,
                    "discountAllowed": true,
                    "eventStartDate": "2024-06-15",
                    "startDate": "2024-06-15",
                    "start": "2024-06-15",
                    "end": "2024-06-15",
                    "endDate": "2024-06-15",
                    "eventEndDate": "2024-06-15"
                  },
                  {
                    "rates": {
                      "rate": {
                        "base": {
                          "amountBeforeTax": 299,
                          "currencyCode": "USD"
                        },
                        "discount": "",
                        "eventStartDate": "2024-06-16",
                        "startDate": "2024-06-16",
                        "start": "2024-06-16",
                        "end": "2024-06-16",
                        "endDate": "2024-06-16",
                        "eventEndDate": "2024-06-16"
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
                    "roomType": "KNGN",
                    "ratePlanCode": "IGCOR",
                    "marketCode": "Z",
                    "sourceCode": "GD",
                    "numberOfUnits": 1,
                    "roomId": "",
                    "pseudoRoom": false,
                    "roomTypeCharged": "KNGN",
                    "fixedRate": true,
                    "discountAllowed": false,
                    "eventStartDate": "2024-06-16",
                    "startDate": "2024-06-16",
                    "start": "2024-06-16",
                    "end": "2024-06-16",
                    "endDate": "2024-06-16",
                    "eventEndDate": "2024-06-16"
                  }
                ],
                "guestCounts": {
                  "adults": 1,
                  "children": 0
                },
                "expectedTimes": {
                  "reservationExpectedArrivalTime": "2024-06-15",
                  "resExpectedArrivalTime": "2024-06-15",
                  "reservationExpectedDepartureTime": "2024-06-17",
                  "resExpectedDepartureTime": "2024-06-17"
                },
                "guarantee": {
                  "guaranteeCode": "CC"
                },
                "promotion": "",
                "arrivalDate": "2024-06-15",
                "departureDate": "2024-06-17"
              },
              "reservationGuests": {
                "profileInfo": {
                  "profileIdList": {
                    "type": "Profile",
                    "idContext": "OPERA",
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
                  "code": 0,
                  "collectingAgentTax": false,
                  "printAutoAdjust": false
                },
                "reverseCheckInAllowed": false,
                "reverseAdvanceCheckInAllowed": false
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
            console.log(response)
        });
  });