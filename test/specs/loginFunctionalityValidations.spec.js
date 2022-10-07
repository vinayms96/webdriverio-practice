/// <reference types="webdriverio/async"/>
/// <reference types="expect-webdriverio"/>

const loginpagePractice = require("../pageobjects/loginpagePractice");
const listingPage = require("../pageobjects/listingPage");
const chaiexpect = require("chai").expect;
const fs = require("fs");

const credentials = JSON.parse(
  fs.readFileSync("test/fixtures/payload/loginCreds.json")
);

describe("Login Functionality Checks", async () => {
  beforeEach(async () => {
    await browser.url("/loginpagePractise/");
    await browser.maximizeWindow();
  });

  credentials.invalid.forEach(({ username, password }) => {
    it("Check login functionality for invalid creds", async () => {
      await (await loginpagePractice.getUsernameField).waitForEnabled();
      loginpagePractice.setUsername(username);
      loginpagePractice.setPassword(password);

      // Wait till values are entered and then click SignIn
      await browser.waitUntil(
        async () =>
          (await (await loginpagePractice.getUsernameField).getValue()) ===
          username
      );
      await (await loginpagePractice.getSignInButton).click();

      await (await loginpagePractice.getLoginPageErrorMsg).waitForDisplayed();
      chaiexpect(
        await (await loginpagePractice.getLoginPageErrorMsg).getText()
      ).to.equal("Incorrect username/password.");
    });
  });

  credentials.valid.forEach(({ username, password }) => {
    it("Check login functionality for valid creds", async () => {
      await (await loginpagePractice.getUsernameField).waitForEnabled();
      loginpagePractice.setUsername(username);
      loginpagePractice.setPassword(password);

      // Wait till values are entered and then click SignIn
      await browser.waitUntil(
        async () =>
          (await (await loginpagePractice.getUsernameField).getValue()) ===
          username
      );
      await (await loginpagePractice.getSignInButton).click();

      expect(await listingPage.getPageTitle).toHaveText("Shop Name");
      // await (await listingPage.getProductsList.$()).waitForDisplayed();
      await browser.pause(2000);
      expect(await listingPage.getProductsList).toHaveLength(4);
    });
  });
});
