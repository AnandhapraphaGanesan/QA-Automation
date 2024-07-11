var reporter = require('cucumber-html-reporter');

//Detect OS and its version
var os = require('os');
//console.log(os.platform()); // 'darwin'
//console.log(os.release()); //'10.8.0'

var os = process.platform;
if (os === "darwin" || os.platform() === "darwin") {
    os = "MacOS";
} else if (os === "win32" || os === "win64" || os.platform() ==="win32") {
    os = "Windows";
} else if (os === "linux" || os.platform() === "linux") {
    os = "Linux";
}
//console.log(os) // I don't know what linux is.

//detecting browser
const { detect } = require('detect-browser');
const browser = detect();

// handle the case where we don't detect the browser
// if (browser) {
//   console.log(browser.name);
//   console.log(browser.version);
//   console.log(browser.os);
// }


var options = {
        theme: 'bootstrap',
        jsonFile: 'report/cucumber_report.json',
        output: 'report/cucumber_report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            "App Version":"1.0",
            "Test Environment": "QA Environment",
            //"Browser": browser.name,
            "Platform": os
        }
    };

    reporter.generate(options);