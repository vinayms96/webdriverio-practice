const merge = require("deepmerge");
const wdioConfig = require("./wdio.conf.js");

exports.config = merge(wdioConfig.config, {
  baseUrl: "https://rahulshettyacademy.com",
  services: ["selenium-standalone"],
  capabilities: [
    {
      // maxInstances can get overwritten per capability. So if you have an in-house Selenium
      // grid with only 5 firefox instances available you can make sure that not more than
      // 5 instances get started at a time.
      maxInstances: 5,
      browserName: "firefox",
      "moz:firefoxOptions": {
        // to run chrome headless the following flags are required
        // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ["-headless"],
      },
      acceptInsecureCerts: true,
      // If outputDir is provided WebdriverIO can capture driver session logs
      // it is possible to configure which logTypes to include/exclude.
      // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
      // excludeDriverLogs: ['bugreport', 'server'],
    },
  ],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
    grep: "Smoke",
  },
});
