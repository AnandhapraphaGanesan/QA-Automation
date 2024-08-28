
let authToken;
 
describe('api Authu Token', function () {
  it('post api test', async function({supertest}) {
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
      .put("/rsv/v1/hotels/GRVZA/reservations/86522")
      .set('Content-Type', 'application/json')
      .set('x-hotelid', 'GRVZA')
      .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
      .set('bypass-routing', 'N')
      .set('Authorization', 'Bearer '+authToken)
      .send(
        {
            "reservations": [
              {
                "reservationIdList": [
                  {
                    "type": "Reservation",
                    "id": "86522"
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
                            "start": "2024-06-17",
                            "end": "2024-06-17"
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
                      "start": "2024-06-17",
                      "end": "2024-06-17"
                    }
                  ],
                  "guestCounts": {
                    "adults": 1,
                    "children": 0
                  },
                  "expectedTimes": {
                    "reservationExpectedArrivalTime": "2024-06-17",
                    "reservationExpectedDepartureTime": "2024-06-18"
                  },
                  "guarantee": {
                    "guaranteeCode": "INN"
                  },
                  "arrivalDate": "2024-06-17",
                  "departureDate": "2024-06-18"
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
      .then(function(response){
         console.log(response)
      });
});
 