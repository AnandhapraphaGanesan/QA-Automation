const pom = require("../../../pageObjects/desktop/pom_sample");



it('User open the application', function (browser) {
    browser.navigateTo('https://www.oracle.com/')
   
  })

it('User Validating the element in the page', function (browser) {
    
     browser.element.find(pom.elements.view_account).getText().assert.equals('View Accounts')
  
  })

it('User close the application', function (browser) {
    
    browser.end()
  })

