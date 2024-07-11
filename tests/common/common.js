var assert = require('assert');
const menu = require('../../pageObjects/mobile/menu')
const login = require('../../pageObjects/mobile/login');
const { client } = require('nightwatch');

module.exports = {
    scroll_down: function(browser){
            browser.perform(function(){
              const actions = this.actions();
              return actions.move({x: 480, y: 1630}).press().move({origin: 'pointer',y: 200, duration: 50}).release();
              });
             browser.pause(10000);
    },     
};

// function scroll_down(browser) {
//       browser.perform(function(){
//         const actions = this.actions();
//         return actions.move({x: 480, y: 1630}).press().move({origin: 'pointer',y: 500, duration: 50}).release();
//         });
//          browser.pause(10000);
// }