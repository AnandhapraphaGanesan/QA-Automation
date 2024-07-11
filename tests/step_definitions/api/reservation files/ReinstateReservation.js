let authToken;

describe("api Authu Token", function () {
  it("Put api test", async function ({ supertest }) {
    await supertest
      .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
      .post("/oauth/v1/tokens")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .set("x-app-key", "69594b78-9894-4914-a894-860ca6d056db")
      .set("Authorization", "Basic Og==")
      .send({
        username: "IHGSIT_COGNIZANT",
        password: "UoHkm74M58C1#f16F3wys3U4",
        grant_type: "password",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        authToken = response._body.access_token;
      });
  });
  it('Put api test after login', async function({supertest}) {
    await supertest
        .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
        .put("/rsv/v1/hotels/GRVZA/reservations/85590/cancellations")
        .set('Content-Type', 'application/json')
        .set('x-hotelid', 'GRVZA')
        .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
        .set('bypass-routing', 'N')
        .set('Authorization', 'Bearer '+authToken)
        .send(
          {
            "reservationIdList": {
                "type": "Reservation",
                "id": 85590
              },
              "hotelId": "GRVZA"
            })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function(response){
           console.log(response)
        });
    });
});