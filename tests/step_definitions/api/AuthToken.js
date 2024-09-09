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
          password: 'BRknSHwFNvLyDpa4h7e3jcK8b!',
          grant_type: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function (response) {
          authToken = response._body.access_token;
          console.log('Access Token:', authToken);
        });
    });
})