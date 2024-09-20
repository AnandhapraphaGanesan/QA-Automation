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
        .put("/rsv/v1/hotels/GRVXX/reservations/97898")
        .set('Content-Type', 'application/json')
        .set('x-hotelid', 'GRVXX')
        .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
        .set('bypass-routing', 'N')
        .set('Authorization', 'Bearer '+authToken)
        .send(
          {
            "reservations": {
            "changeInstrunctions": {
              "changeAllShares": false,
              "overrideInventory": false
            },
            "reservationIdList": {
              "type": "Reservation",
              "idContext": "OPERA",
              "id": 97898
            },
            "roomStay": {
              "guarantee": {
                "guaranteeCode": "CC"
              }
            },
            "reservationPaymentMethods": [
                {
                    "emailFolioInfo": {
                        "emailFolio": "false"
                    },
                },
                {
                    "paymentCard": {
                        "cardType": "AX",
                        "cardNumber": "373344556677889",
                        "cardNumberMasked": "XXXXXXXXXXXX0149",
                        "expirationDate": "2029-08-24",
                        "storeToCreditCardWallet": "false"
                    },
                    "emailFolioInfo": {
                        "emailFolio": "false"
                    },
                    "paymentMethod": "AX",
                    "folioView": "1"
                },
               
            ],
            "cashiering": {
                "taxType": {
                    "code": "",
                    "collectingAgentTax": "false",
                    "printAutoAdjust": "false"
                },
                "reverseCheckInAllowed": "false",
                "reverseAdvanceCheckInAllowed": "false"
            },
            "hotelId": "GRVXX",
            "reservationStatus": "Reserved",
            "customReference": "",
            "displayColor": "",
            "markAsRecentlyAccessed": "true",
            "preRegistered": "false",
            "allowMobileCheckout": "false",
            "overrideOutOfServiceCheck": "true"
 
            }
          }
        )
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function(response){
           console.log(response)
        });
  });