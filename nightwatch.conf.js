// Refer to the online docs for more details:
// https://nightwatchjs.org/gettingstarted/configuration/
//

//  _   _  _         _      _                     _          _
// | \ | |(_)       | |    | |                   | |        | |
// |  \| | _   __ _ | |__  | |_ __      __  __ _ | |_   ___ | |__
// | . ` || | / _` || '_ \ | __|\ \ /\ / / / _` || __| / __|| '_ \
// | |\  || || (_| || | | || |_  \ V  V / | (_| || |_ | (__ | | | |
// \_| \_/|_| \__, ||_| |_| \__|  \_/\_/   \__,_| \__| \___||_| |_|
//             __/ |
//            |___/

module.exports = {
  // An array of folders (excluding subfolders) where your tests are located;
  // if this is not specified, the test source must be passed as the second argument to the test runner.
  src_folders: ['tests/step_definitions/api'],

  // See https://nightwatchjs.org/guide/concepts/page-object-model.html
  page_objects_path: ['pageObjects'],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-commands.html
  custom_commands_path: ['nightwatch/custom-commands'],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-assertions.html
  custom_assertions_path: ['nightwatch/custom-assertions'],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-plugins.html
  plugins: ['@nightwatch/apitesting'],

  
  
  // See https://nightwatchjs.org/guide/concepts/test-globals.html
  globals_path: '',
  
  webdriver: {},

  test_workers: {
    enabled: true
  },

  test_settings: {
    default: {
      disable_error_log: false,
      launch_url: 'https://www.oracle.com/',

      screenshots: {
        enabled: true,
        path: './Screenshots',
        on_failure: true
      },

      desiredCapabilities: {
        browserName: 'chrome'
      },
      
      webdriver: {
        start_process: true,
        server_path: ''
      },
      
    },

    api_testing: {
      start_session: false,
      webdriver: {
        start_process: false,
        log_responses: true
      }
      
       
      
    },
    
    
    safari: {
      desiredCapabilities: {
        browserName: 'safari',
        alwaysMatch: {
          acceptInsecureCerts: false
        }
      },
      webdriver: {
        start_process: true,
        server_path: ''
      }
    },
    
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        alwaysMatch: {
          acceptInsecureCerts: true,
          'moz:firefoxOptions': {
            args: [
              // '-headless',
              // '-verbose'
            ]
          }
        }
      },
      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [
          // very verbose geckodriver logs
          // '-vv'
        ]
      }
    },
    
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          //
          // w3c:false tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
          w3c: true,
          args: [
            //'--no-sandbox',
            //'--ignore-certificate-errors',
            //'--allow-insecure-localhost',
            //'--headless'
          ]
        }
      },

      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [
          // --verbose
        ]
      }
    },
    
    edge: {
      desiredCapabilities: {
        browserName: 'MicrosoftEdge',
        'ms:edgeOptions': {
          w3c: true,
          // More info on EdgeDriver: https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options
          args: [
            //'--headless'
          ]
        }
      },

      webdriver: {
        start_process: true,
        // Follow https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/?tabs=c-sharp#download-microsoft-edge-webdriver
        // to download the Edge WebDriver and set the location of extracted `msedgedriver` below:
        server_path: '',
        cli_args: [
          // --verbose
        ]
      }
    },
    
    'android.real.firefox': {
      desiredCapabilities: {
        real_mobile: true,
        browserName: 'firefox',
        acceptInsecureCerts: true,
        'moz:firefoxOptions': {
          args: [
            // '-headless',
            // '-verbose'
          ],
          androidPackage: 'org.mozilla.firefox',
          // add the device serial to run tests on, if multiple devices are online
          // Run command: `$ANDROID_HOME/platform-tools/adb devices`
          // androidDeviceSerial: 'ZD2222W62Y'
        }
      },
      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [
          // very verbose geckodriver logs
          // '-vv'
        ]
      }
    },

    'android.emulator.firefox': {
      desiredCapabilities: {
        real_mobile: false,
        avd: 'nightwatch-android-11',
        browserName: 'firefox',
        acceptInsecureCerts: true,
        'moz:firefoxOptions': {
          args: [
            // '-headless',
            // '-verbose'
          ],
          androidPackage: 'org.mozilla.firefox',
          // add the device serial to run tests on, if multiple devices are online
          // Run command: `$ANDROID_HOME/platform-tools/adb devices`
          // androidDeviceSerial: 'ZD2222W62Y'
        }
      },
      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [
          // very verbose geckodriver logs
          // '-vv'
        ]
      }
    },
    
    'android.real.chrome': {
      desiredCapabilities: {
        real_mobile: true,
        browserName: 'chrome',
        'goog:chromeOptions': {
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          //
          // w3c:false tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
          w3c: true,
          args: [
            //'--no-sandbox',
            //'--ignore-certificate-errors',
            //'--allow-insecure-localhost',
            //'--headless'
          ],
          androidPackage: 'com.android.chrome',
          // add the device serial to run tests on, if multiple devices are online
          // Run command: `$ANDROID_HOME/platform-tools/adb devices`
          // androidDeviceSerial: ''
        },
      },
    
      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [
          // --verbose
        ]
      }
    },

    'android.emulator.chrome': {
      desiredCapabilities: {
        real_mobile: false,
        avd: 'nightwatch-android-11',
        browserName: 'chrome',
        'goog:chromeOptions': {
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          //
          // w3c:false tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
          w3c: true,
          args: [
            //'--no-sandbox',
            //'--ignore-certificate-errors',
            //'--allow-insecure-localhost',
            //'--headless'
          ],
          androidPackage: 'com.android.chrome',
          // add the device serial to run tests on, if multiple devices are online
          // Run command: `$ANDROID_HOME/platform-tools/adb devices`
          // androidDeviceSerial: ''
        },
      },
    
      webdriver: {
        start_process: true,
        // path to chromedriver executable which can work with the factory
        // version of Chrome mobile browser on the emulator (version 83).
        server_path: 'chromedriver-mobile/chromedriver',
        cli_args: [
          // --verbose
        ]
      }
    },
    
    'ios.real.safari': {
      desiredCapabilities: {
        browserName: 'safari',
        platformName: 'iOS',
        // add udid of the device to run tests on (necessary)
        // Run command: `xcrun xctrace list devices`
        // 'safari:deviceUDID': '00008030-00024C2C3453402E',
      },
    
      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [
          // --verbose
        ]
      }
    },
    
    'ios.simulator.safari': {
      desiredCapabilities: {
        browserName: 'safari',
        platformName: 'iOS',
        'safari:useSimulator': true,
        // To find the available deviceName/platformName to run tests on,
        // run command: `xcrun simctl list devices`
        // 'safari:platformVersion': '15.0',
        'safari:deviceName': 'iPhone 13'
      },
    
      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [
          // --verbose
        ]
      }
    },
    
    app: {
      selenium: {
        start_process: true,
        use_appium: true,
        host: 'localhost',
        port: 4723,
        server_path: '',
        // args to pass when starting the Appium server
        cli_args: [
          // automatically download the required chromedriver
          // '--allow-insecure=chromedriver_autodownload'
        ],
        // Remove below line if using Appium v1
        default_path_prefix: ''
      },
      webdriver: {
        timeout_options: {
          timeout: 150000,
          retry_attempts: 3
        },
        keep_alive: false,
        start_process: false
      }
    },
    
    'app.android.emulator': {
      extends: 'app',
      'desiredCapabilities': {
        // More capabilities can be found at https://github.com/appium/appium-uiautomator2-driver#capabilities
        browserName: null,
        platformName: 'android',
        // `appium:options` is not natively supported in Appium v1, but works with Nightwatch.
        // If copying these capabilities elsewhere while using Appium v1, make sure to remove `appium:options`
        // and add `appium:` prefix to each one of its capabilities, e.g. change 'app' to 'appium:app'.
        'appium:options': {
          automationName: 'UiAutomator2',
          // Android Virtual Device to run tests on
          avd: 'nightwatch-android-11',
          // While Appium v1 supports relative paths, it's more safe to use absolute paths instead.
          // Appium v2 does not support relative paths.
          app: `${__dirname}/nightwatch/sample-apps/wikipedia.apk`,
          appPackage: 'org.wikipedia',
          appActivity: 'org.wikipedia.main.MainActivity',
          appWaitActivity: 'org.wikipedia.onboarding.InitialOnboardingActivity',
          // chromedriver executable to use for testing web-views in hybrid apps
          chromedriverExecutable: `${__dirname}/chromedriver-mobile/chromedriver`,
          newCommandTimeout: 0
        }
      }
    },

    'app.android.real': {
      extends: 'app',
      'desiredCapabilities': {
        // More capabilities can be found at https://github.com/appium/appium-uiautomator2-driver#capabilities
        browserName: null,
        platformName: 'android',
        // `appium:options` is not natively supported in Appium v1, but works with Nightwatch.
        // If copying these capabilities elsewhere while using Appium v1, make sure to remove `appium:options`
        // and add `appium:` prefix to each one of its capabilities, e.g. change 'app' to 'appium:app'.
        'appium:options': {
          automationName: 'UiAutomator2',
          // While Appium v1 supports relative paths, it's more safe to use absolute paths instead.
          // Appium v2 does not support relative paths.
          app: `${__dirname}/nightwatch/sample-apps/wikipedia.apk`,
          appPackage: 'org.wikipedia',
          appActivity: 'org.wikipedia.main.MainActivity',
          appWaitActivity: 'org.wikipedia.onboarding.InitialOnboardingActivity',
          // 'chromedriver' binary is required while testing hybrid mobile apps.
          // 
          // Set `chromedriverExecutable` to '' to use binary from `chromedriver` NPM package (if installed).
          // Or, put '--allow-insecure=chromedriver_autodownload' in `cli_args` property of `selenium`
          // config (see 'app' env above) to automatically download the required version of chromedriver
          // (delete `chromedriverExecutable` capability below in that case).
          chromedriverExecutable: '',
          newCommandTimeout: 0,
          // add device id of the device to run tests on, if multiple devices are online
          // Run command: `$ANDROID_HOME/platform-tools/adb devices` to get all connected devices
          // udid: '',
        }
      }
    },
    
    'app.ios.simulator': {
      extends: 'app',
      'desiredCapabilities': {
        // More capabilities can be found at https://github.com/appium/appium-xcuitest-driver#capabilities
        browserName: null,
        platformName: 'ios',
        // `appium:options` is not natively supported in Appium v1, but works with Nightwatch.
        // If copying these capabilities elsewhere while using Appium v1, make sure to remove `appium:options`
        // and add `appium:` prefix to each one of its capabilities, e.g. change 'app' to 'appium:app'.
        'appium:options': {
          automationName: 'XCUITest',
          // platformVersion: '15.5',
          deviceName: 'iPhone 13',
          // While Appium v1 supports relative paths, it's more safe to use absolute paths instead.
          // Appium v2 does not support relative paths.
          app: `${__dirname}/nightwatch/sample-apps/wikipedia.zip`,
          bundleId: 'org.wikimedia.wikipedia',
          newCommandTimeout: 0
        }
      }
    },

    'app.ios.real': {
      extends: 'app',
      'desiredCapabilities': {
        // More capabilities can be found at https://github.com/appium/appium-xcuitest-driver#capabilities
        browserName: null,
        platformName: 'ios',
        // `appium:options` is not natively supported in Appium v1, but works with Nightwatch.
        // If copying these capabilities elsewhere while using Appium v1, make sure to remove `appium:options`
        // and add `appium:` prefix to each one of its capabilities, e.g. change 'app' to 'appium:app'.
        'appium:options': {
          automationName: 'XCUITest',
          // While Appium v1 supports relative paths, it's more safe to use absolute paths instead.
          // Appium v2 does not support relative paths.
          app: `${__dirname}/nightwatch/sample-apps/wikipedia.zip`,
          bundleId: 'org.wikimedia.wikipedia',
          newCommandTimeout: 0,
          // add udid of the device to run tests on. Or, pass the id to `--deviceId` flag when running tests.
          // device id could be retrieved from Xcode > Window > "Devices and Simulators" window.
          // udid: '00008030-00024C2C3453402E'
        }
      }
    },
    
    //////////////////////////////////////////////////////////////////////////////////
    // Configuration for using the Sauce Labs cloud service                          |
    //                                                                               |
    // Please set the username and access key by setting the environment variables:  |
    // - SAUCE_USERNAME                                                              |
    // - SAUCE_ACCESS_KEY                                                            |
    //////////////////////////////////////////////////////////////////////////////////
    saucelabs: {
      selenium: {
        host: 'ondemand.saucelabs.com',
        port: 443
      },
      // More info on configuring capabilities can be found on:
      // https://wiki.saucelabs.com/display/DOCS/Test+Configuration+Options
      desiredCapabilities: {
        'sauce:options': {
          username: '${SAUCE_USERNAME}',
          accessKey: '${SAUCE_ACCESS_KEY}',
          screenResolution: '1280x1024'
          // https://docs.saucelabs.com/dev/cli/sauce-connect-proxy/#--region
          // region: 'us-west-1'
          // https://docs.saucelabs.com/dev/test-configuration-options/#tunnelidentifier
          // parentTunnel: '',
          // tunnelIdentifier: '',
        },
        javascriptEnabled: true,
        acceptSslCerts: true,
        // https://docs.saucelabs.com/dev/test-configuration-options/#timezone
        timeZone: 'London'
      },
      disable_error_log: false,
      webdriver: {
        start_process: false
      }
    },
    
    'saucelabs.chrome': {
      extends: 'saucelabs',
      desiredCapabilities: {
        browserName: 'chrome',
        browserVersion: 'latest',
        platformName: 'Windows 10',
        'goog:chromeOptions': {
          w3c: true
        }
      }
    },
    
    'saucelabs.firefox': {
      extends: 'saucelabs',
      desiredCapabilities: {
        browserName: 'firefox',
        browserVersion: 'latest',
        platformName: 'Windows 10'
      }
    },
    
    'saucelabs.safari': {
      extends: 'saucelabs',
      desiredCapabilities: {
        browserName: 'safari',
        browserVersion: 'latest',
        platformName: 'macOS 10.13'
      }
    },
    
  },
  
  usage_analytics: {
    enabled: true,
    log_path: './logs/analytics',
    client_id: 'b487d11d-77ed-409e-b8b2-b264632c5a21'
  }
  
};
