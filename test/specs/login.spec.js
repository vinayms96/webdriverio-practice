/// <reference types="webdriverio/async"/>
/// <reference types="expect-webdriverio"/>

const chaiexpect = require("chai").expect;

const loginPage = require("../pageobjects/login.page");
const HomePage = require("../fixtures/payload/loginCreds");

describe("Amazon Accounts Management", () => {
  beforeEach(async () => {
    browser.url("/");
    browser.maximizeWindow();
  });

  xit("Verify navigating to Login page", async () => {
    HomePage.clickLoginSignupButton();
    expect((await loginPage.getSignInPageTitle).trim()).toEqual("Sign in");
  });

  xit("Verify the input fields", async () => {
    HomePage.clickLoginSignupButton();

    loginPage.setMobileorEmailId("thundurustest@gmail.com");
    await browser.waitUntil(
      async () =>
        (await (await loginPage.getMobileorEmailIdField).getValue()) !== ""
    );
    expect(await (await loginPage.getMobileorEmailIdField).getValue()).toEqual(
      "thundurustest@gmail.com"
    );
    loginPage.clickContinueButton();

    loginPage.setPassword("deu_xjh.DUM0dbq8rtg");
    await browser.waitUntil(
      async () => (await (await loginPage.getPasswordField).getValue()) !== ""
    );
    expect(await (await loginPage.getPasswordField).getValue()).toEqual(
      "deu_xjh.DUM0dbq8rtg"
    );
    chaiexpect(await (await loginPage.getPasswordField).getValue()).to.equal(
      "deu_xjh.DUM0dbq8rtg"
    );

    loginPage.clickSignInButton();

    await browser.waitUntil(
      async () =>
        (await browser.getTitle()) ===
        "Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in"
    );
    // automate this site https://rahulshettyacademy.com/loginpagePractise/
  });
});
