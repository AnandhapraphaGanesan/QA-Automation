module.exports = {
    'loginPage Test': function (browser) {
        const loginUrl = "https://ihgcu2ua.oraclehospitality.us-ashburn-1.ocs.oraclecloud.com/OPERA9/opera/operacloud/faces/opera-cloud-index/OperaCloud"

        browser
            .url("loginUrl")
            .pause(2000)
            .maximizeWindow()
            .pause(2000)
            .click("#username")
            .pause(2000)
            .useXpath()
            .setValue("//*[@id='username']", "Anandhaprapha")
            .pause(2000)
            .setValue("//*[@id='password']", "Indhujay@10")
            .pause(2000)
            .useCss()
            .click("#loginBtn")
            .pause(2000)
    }
}
