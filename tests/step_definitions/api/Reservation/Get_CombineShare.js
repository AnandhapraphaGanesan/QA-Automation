let authToken;
describe('api Authu Token', function () {
  it('Get api test', async function ({ supertest }) {
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
      .then(function (response) {
        authToken = response._body.access_token;
      });
  });
})
it('Get api test after login', async function ({ supertest }) {
  await supertest
    .request("https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com")
    .get("/rsv/v1/hotels/GRVZA/reservations/83042")
    .set('Content-Type', 'application/json')
    .set('x-hotelid', 'GRVZA')
    .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
    .set('bypass-routing', 'N')
    .set('Authorization', 'Bearer ' + authToken)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(function (response) {
      console.log(response)
      const responseBody = JSON.parse(response.text); // Parse the response body from JSON text
      const reservation = responseBody.reservations.reservation[0]; // Get the first reservation
      
      // Extracting the confirmation ID
      const confirmationIdEntry = reservation.reservationIdList.find(idEntry => idEntry.type === 'Confirmation');
      const confirmationId = confirmationIdEntry ? confirmationIdEntry.id : 'Not found';
      
      // Extracting the external reference ID
      const externalReferenceIdEntry = reservation.externalReferences.find(ref => ref.idContext === 'CRS_IHGSIT');
      const externalReferenceId = externalReferenceIdEntry ? externalReferenceIdEntry.id : 'Not found';
      
      // Logging both IDs to the console
      console.log('Confirmation ID:', confirmationId);
      console.log('External Reference ID:', externalReferenceId);
    });
});