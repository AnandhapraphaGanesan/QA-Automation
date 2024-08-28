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
          .put("/rsv/v1/hotels/GRVZA/reservations/83070/combineshares/action/validate")
          .set('Content-Type', 'application/json')
          .set('x-hotelid', 'GRVZA')
          .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
          .set('bypass-routing', 'N')
          .set('Authorization', 'Bearer ' + authToken)
            .send(
                {
                    "shareToReservationId": {
                      "type": "Reservation",
                      "id": "82445"
                    },
                    "hotelId": "GRVZA",
                    "newReservation": {
                      "newSharerId": {
                        "type": "Profile",
                        "id": "83070"
                      },
                      "guestCounts": {
                        "adults": 1,
                        "children": 0
                      },
                      "reservationPaymentMethods": {
                        "copyCreditCards": false,
                        "copyOthers": false,
                        "reservationPaymentMethod": [
                          {
                            "paymentCard": {
                              "cardId": {
                                "type": "CreditCard",
                                "id": "38075"
                              },
                              "cardType": "Va",
                              "cardNumberMasked": "xxxx",
                              "cardHolderName": "John Smith",
                              "cardPresent": false
                            },
                            "emailFolioInfo": {
                              "emailFolio": false
                            },
                            "paymentMethod": "VI",
                            "folioView": "1"
                          }
                        ]
                      },
                      "timeSpan": {
                        "startDate": "2024-10-21",
                        "endDate": "2024-10-22"
                      }
                    }
                  }
            )
            .expect(200)
            .expect('Content-Type', /json/)
            .then(function (response) {
                console.log(response);
            });
    });
});


