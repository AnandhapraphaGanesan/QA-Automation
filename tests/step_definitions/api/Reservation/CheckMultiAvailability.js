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

})
it('Get api test after login', async function ({ supertest }) {
  await supertest
  .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
  .get("/par/v1/availability")
  .query({
    "roomStayStartDate": "2024-08-08",
      "roomStayEndDate": "2024-08-09",
      "hotelIds": "GRVZA",
      "children": 0,
      "roomTypeInfo": true,
      "adults": 1,
      "ratePlanInfo": true,
      "limit": 3,
      "redeemAwards": false,
      "roomStayQuantity": 1,
      "initialRatePlanSet": true,
      "resGuaranteeInfo": false
  })
    .set('Content-Type', 'application/json')
    .set('x-hotelid', 'GRVZA')
    .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
    .set('bypass-routing', 'Y')
    .set('Authorization', 'Bearer ' + authToken)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(function (response) {
      console.log(response)
    });
});

