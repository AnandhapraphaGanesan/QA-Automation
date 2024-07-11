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

  it('post api test after login', async function ({ supertest }) {
    await supertest
      .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
      .post("/fof/v0/hotels/GRVZA/reservations/84556/roomAssignments")
      .set('Content-Type', 'application/json')
      .set('x-hotelid', 'GRVZA')
      .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
      .set('bypass-routing', 'N')
      .set('Authorization', 'Bearer ' + authToken)
      .send(
        {
            "criteria": {
              "hotelId": "GRVZA",
              "reservationIdList": {
                "type": "Reservation",
                "id": 84556
              },
              "roomId": 802,
              "overrideInstructions": {
                "dirtyRoom": false,
                "outOfServiceRoom": false,
                "sleepDiscrepantRoom": false,
                "occupancyRestriction": false,
                "rateRestriction": false,
                "inventoryRestriction": false,
                "roomNumberLocked": true,
                "holdRoom": false,
                "overrideExternalChecks": false,
                "dayUseReserved": false,
                "overrideRotationRoom": false
              },
              "updateRoomTypeCharged": false,
              "includeDepartureRooms": true,
              "roomNumberLocked": false
            }
          }
      )
      .expect(201)
      .expect('Content-Type', /json/)
      .then(function (response) {
        console.log(response)
      });
  });
})