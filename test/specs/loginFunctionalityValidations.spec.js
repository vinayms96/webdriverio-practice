/// <reference types="webdriverio/async"/>
/// <reference types="expect-webdriverio"/>

const loginpagePractice = require("../pageobjects/loginpagePractice");
const listingPage = require("../pageobjects/listingPage");
const chaiexpect = require("chai").expect;
const fs = require("fs");

const credentials = JSON.parse(
  fs.readFileSync("test/fixtures/payload/loginCreds.json")
);

describe("All Fields Check", async () => {
  beforeEach(async () => {
    await browser.url("/loginpagePractise/");
    await browser.maximizeWindow();
  });

  credentials.invalid.forEach(({ username, password }) => {
    it("Check login functionality for invalid creds", async () => {
      await browser.pause(2000);
      console.log(await loginpagePractice.getUsernameField);
      await (await loginpagePractice.getUsernameField).waitForEnabled();
      loginpagePractice.setUsername(username);
      loginpagePractice.setPassword(password);

      await (await loginpagePractice.getSignInButton).click();

      await (await loginpagePractice.getLoginPageErrorMsg).waitForDisplayed();
      expect(await listingPage.getProductsList).toHaveText(
        "Incorrect username/password."
      );
    });
  });

  credentials.valid.forEach(({ username, password }) => {
    it("Check login functionality for invalid creds", async () => {
      await browser.pause(2000);
      console.log(await loginpagePractice.getUsernameField);
      await (await loginpagePractice.getUsernameField).waitForEnabled();
      loginpagePractice.setUsername(username);
      loginpagePractice.setPassword(password);

      await (await loginpagePractice.getSignInButton).click();

      expect(await listingPage.getPageTitle).toHaveText("Shop Name");
      // await (await listingPage.getProductsList[1]).waitForDisplayed();
      await browser.pause(2000);
      expect(await listingPage.getProductsList).toHaveLength(4);
    });
  });
});
