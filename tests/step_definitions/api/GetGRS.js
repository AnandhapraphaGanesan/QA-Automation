let authToken;
 
describe('api Authu Token', function () {
  it('GET api test', async function({supertest}) {
    await supertest
      .request("https://int-api.ihg.com")
      .post("/external/authentication/v1/token")
   //   .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('X-IHG-M2M', '>24Y#-#`R-S8W,2MS=&%G:6YG+6%P:2YI:&<N8V]M')
        .set('User-Agent', 'Oracle PMS to APIGee')
        .set('X-IHG-AUTO', '>24Y#-#`R-S8W,2MS=&%G:6YG+6%P:2YI:&<N8V]M')
        .set('X-IHG-API-KEY', 'Af9n4H1gUGdEAOGK6PcPk3FWX2PhyWFo')
     // .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
      .set('Authorization', 'Basic QWY5bjRIMWdVR2RFQU9HSzZQY1BrM0ZXWDJQaHlXRm86ODRjd2VVMEtBM2IycFl4WA==')
    .send({
        username: 'IHGSIT_COGNIZANT',
   //     password: 'UoHkm74M58C1#f16F3wys3U4',
   //     grant_type: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function(response){
        authToken=response._body.access_token;
      });
  });
  });

  it('Get api test ', async function ({ supertest }) {    
    await supertest
      .request("https://int-api.ihg.com")
      .get("/reservations/v3/hotels/66481291")
      .query({
        lastName: 'SR'
      })
      .set('Content-Length', '0')
      .set('X-IHG-M2M', '>24Y#-#`R-S8W,2MS=&%G:6YG+6%P:2YI:&<N8V]M')
      .set('User-Agent', 'Oracle PMS to APIGee')
      .set('X-IHG-AUTO', '>24Y#-#`R-S8W,2MS=&%G:6YG+6%P:2YI:&<N8V]M')
      .set('X-IHG-API-KEY', 'Af9n4H1gUGdEAOGK6PcPk3FWX2PhyWFo')
      .set('bypass-routing', 'N')
      .set('Authorization', 'Basic QWY5bjRIMWdVR2RFQU9HSzZQY1BrM0ZXWDJQaHlXRm86ODRjd2VVMEtBM2IycFl4WA==')
      .set('Content-Length', '<calculated when request is sent>')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        console.log(response.text);
        console.log("Get API test after login run successfully");
      });
  });
  