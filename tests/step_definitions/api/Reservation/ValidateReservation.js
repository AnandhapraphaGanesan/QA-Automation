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

  it('put api test after login', async function ({ supertest }) {
    await supertest
      .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
      .put("/rsv/v1/hotels/GRVZA/reservations/validations")
      .set('Content-Type', 'application/json')
      .set('x-hotelid', 'GRVZA')
      .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
      .set('bypass-routing', 'N')
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
                      "eventStartDate": "2024-08-08",
                      "startDate": "2024-08-08",
                      "start": "2024-08-08",
                      "end": "2024-08-08",
                      "endDate": "2024-08-08",
                      "eventEndDate": "2024-08-08"
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
                  "roomType": "KNGN",
                  "ratePlanCode": "IGCOR",
                  "marketCode": "G",
                  "sourceCode": "GD",
                  "numberOfUnits": 1,
                  "pseudoRoom": false,
                  "roomTypeCharged": "KNGN",
                  "eventStartDate": "2024-08-08",
                  "startDate": "2024-08-08",
                  "start": "2024-08-08",
                  "end": "2024-08-08",
                  "endDate": "2024-08-08",
                  "eventEndDate": "2024-08-08"
                },
                "guestCounts": {
                  "adults": 1,
                  "children": 0
                },
                "expectedTimes": {
                  "reservationExpectedArrivalTime": "2024-08-08",
                  "resExpectedArrivalTime": "2024-08-08",
                  "reservationExpectedDepartureTime": "2024-08-09",
                  "resExpectedDepartureTime": "2024-08-09"
                },
                "guarantee": {
                  "guaranteeCode": "INN"
                },
                "arrivalDate": "2024-08-08",
                "departureDate": "2024-08-09"
              },
              "hotelId": "GRVZA",
              "preRegistered": false,
              "allowMobileCheckout": false,
              "overrideOutOfServiceCheck": true
            },
            "timeSpan": {
              "startDate": "2024-08-08",
              "endDate": "2024-08-09"
            }
          }
      )
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        console.log(response)
      });
  });
})
