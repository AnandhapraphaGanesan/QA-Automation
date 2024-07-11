let authToken;

describe("api Authu Token", function () {
  it("post api test", async function ({ supertest }) {
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
});

it("post api test after login", async function ({ supertest }) {
  await supertest
    .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
    .post("/rsv/v1/reservations/linkedReservations/83799")
    .set("Content-Type", "application/json")
    .set("x-hotelid", "GRVZA")
    .set("x-app-key", "69594b78-9894-4914-a894-860ca6d056db")
    .set("bypass-routing", "N")
    .set("Authorization", "Bearer " + authToken)
    .send({
      reservationIdList: [
        {
          type: "Reservation",
          id: "83798",
        },
      ],
      linkToReservationId: {
        type: "Reservation",
        id: "83799",
      },
      "responseInstruction": {
        "fetchLinkedReservations": true
      }
    })
    .expect(201)
    .expect("Content-Type", /json/)
    .then(function (response) {
      console.log(response);
    });
});
