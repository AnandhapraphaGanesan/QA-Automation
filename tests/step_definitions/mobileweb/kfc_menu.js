const { Given, Then, When, useXpath } = require('@cucumber/cucumber');
const menumobileweb = require('../../../pageObjects/menumobileweb');

Given(/^user open KFC website$/, async () => {
      return await browser.navigateTo('https://simmer-a.kfc-digital.io/')
            .pause(10000);
});

Given(/^user is on the KFC home page$/, function () {
      return browser
            .waitForElementVisible(menumobileweb.elements.home, 10000)
            .assert.elementPresent(menumobileweb.elements.home);
});

When(/^user clicks on the hamburger button$/, function () {
      return browser
            .pause(1000)
            .click(menumobileweb.elements.Hamburger_icon)
            .pause(1000);
});

When(/^user clicks on the menu button$/, function () {
      return browser
            .pause(10000)
            .click(menumobileweb.elements.menu)
            .pause(1000);
});

Then(/^user should see the desserts category is displayed$/, function () {
      return browser
            .waitForElementVisible(menumobileweb.elements.desserts, 10000)
            .assert.elementPresent(menumobileweb.elements.desserts);
});