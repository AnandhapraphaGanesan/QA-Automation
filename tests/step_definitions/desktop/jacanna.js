module.exports={
    'jacana':function(browser){
 
        //open the url
        browser.url("https://wordpress-ntp.netlify.app/")
        .maximizeWindow()
        .pause(3000)
        .assert.textContains('h1', 'Hello World', 'The word "Hello World" is present in the h1 element')
        .perform(function() {
            console.log('Text presence assertion passed');
        })
 
        //navigate to home page
        .click('#modal-1-content > ul > li:nth-child(1) > a > span')
        .pause(4000)
        .assert.textContains('h1', 'Sample Page', 'The word "Sample Page" is present in the h1 element')
        .perform(function() {
            console.log('Successfully navigate to Home Page');
        })
 
        //back to page
        .click('body > div > header > div > div > div.wp-block-group.is-layout-flex.wp-container-core-group-is-layout-2.wp-block-group-is-layout-flex > div.wp-block-site-logo > a > img')
        .pause(3000)
        .assert.textContains('h1', 'Hello World', 'The word "Hello World" is present in the h1 element')
        .perform(function() {
            console.log('Text presence assertion passed');
        })
 
        //navigate to About page
        .click('#modal-1-content > ul > li:nth-child(2) > a > span')
        .pause(3000)
        .assert.textContains('h1', 'Sample Page', 'The word "Sample Page" is present in the h1 element')
        .perform(function() {
            console.log('Successfully navigate to About Page');
        })
 
        //back to page
        .click('body > div > header > div > div > div.wp-block-group.is-layout-flex.wp-container-core-group-is-layout-2.wp-block-group-is-layout-flex > div.wp-block-site-logo > a > img')
        .pause(3000)
        .assert.textContains('h1', 'Hello World', 'The word "Hello World" is present in the h1 element')
        .perform(function() {
            console.log('Text presence assertion passed');
        })
 
        //navigate to contact us page
        .click('#modal-1-content > ul > li:nth-child(3) > a > span')
        .pause(3000)
        .assert.textContains('h1', 'Contact Us', 'The word "Contact Us" is present in the h1 element')
        .perform(function() {
            console.log('Successfully navigate to Contact Us Page');
        })
 
        //back to page
        .click('body > div > header > div > div > div.wp-block-group.is-layout-flex.wp-container-core-group-is-layout-2.wp-block-group-is-layout-flex > div.wp-block-site-logo > a > img')
        .pause(3000)
        .assert.textContains('h1', 'Hello World', 'The word "Hello World" is present in the h1 element')
        .perform(function() {
            console.log('Text presence assertion passed');
        })
 
        //close the Browser
        .end()
 
    }
}