var assert = require('assert');
const menu = require('../../../../pageObjects/mobile/menu');
const login = require('../../../../pageObjects/mobile/login');
const { client } = require('nightwatch');
//const common = require('../../../common/common');

test('Scenario: To verify user is able to navigate menu landing screen and verify its category list', function () {

    it('Given user clicks on the Continue As Guest button', async function (app) {
        app
            .click(login.elements.guest)
    });
    it('When user clicks on the Skip show me chicken button', async function (app) {
        app
            .click(login.elements.skip)
    });
    it('And user verifies menu header is displayed in the screen', async function (app) {
        app
            .assert.visible(menu.elements.menu_header)
    });
    it('Then user verify the list of categories from the menu screen', async function (browser) {
        
        browser.execute('window.scrollTo(0,document.body.scrollHeight);');

       
    });
});