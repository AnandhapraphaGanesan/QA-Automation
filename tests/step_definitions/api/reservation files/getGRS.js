let authToken;

describe('api Authu Token', function () {
  it('GET api test', async function({supertest}) {
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

  it('Get api test after login', async function({supertest}) {
    await supertest
      .request("https://int-api.ihg.com")
      .get("/reservations/v3/hotels/43959155?lastName=kp")
	  .set('X-IHG-M2M', 'R-S8W,2MS=&%G:6YG+6%P:2YI:&<N8V]M')
      .set('User-Agent', 'Oracle PMS to APIGee')
      .set('X-IHG-API-KEY', 'Af9n4H1gUGdEAOGK6PcPk3FWX2PhyWFo')
      .set('bypass-routing', 'N')
      .set('Authorization', 'Bearer '+authToken)
      .expect(200)
	  .expect('Content-Type', /json/)
    });
});