/// <reference types="webdriverio/async"/>
/// <reference types="expect-webdriverio"/>

const chaiexpect = require("chai").expect;

const loginpagePractice = require("../pageobjects/loginpagePractice");

describe("All Fields Check", async function () {
  // Retry entire spec file
  this.retries(4);

  beforeEach(async () => {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    await browser.maximizeWindow();
  });

  it("Check text input fields visibility", async function () {
    // Retry specific tests
    this.retries(2);

    await browser.pause(2000);
    chaiexpect(
      await (await loginpagePractice.getUsernameField).isDisplayed()
    ).to.equal(true);
    chaiexpect(
      await (await loginpagePractice.getPasswordField).isDisplayed()
    ).to.equal(true);
  });

  it("Check text input fields value entered", async () => {
    (await loginpagePractice.getUsernameField).waitForEnabled();
    loginpagePractice.setUsername("rahulshettyacademy");
    loginpagePractice.setPassword("learning");

    await browser.pause(2000);
    chaiexpect(
      await (await loginpagePractice.getUsernameField).getValue()
    ).to.eq("rahulshettyacademy");
    chaiexpect(
      await (await loginpagePractice.getPasswordField).getValue()
    ).to.eq("learning");
  });

  it("Handling popups in Login page, tag:Smoke", async () => {
    loginpagePractice.clickRadioButton(2);
    await (await loginpagePractice.getPopupElement).waitForDisplayed();
    chaiexpect(
      await (await (await loginpagePractice.getPopupElement).$("p")).getText()
    ).to.eq(
      "You will be limited to only fewer functionalities of the app. Proceed?"
    );
    await loginpagePractice.clickPopupOkButton();
    expect(
      await (
        await (await loginpagePractice.getRadioButton(2)).nextElement()
      ).isSelected()
    ).toEqual(true);
    expect(
      await (
        await (await loginpagePractice.getRadioButton(1)).nextElement()
      ).isSelected()
    ).toEqual(false);

    loginpagePractice.clickRadioButton(1);
    expect(
      await (
        await (await loginpagePractice.getRadioButton(2)).nextElement()
      ).isSelected()
    ).toEqual(false);
    expect(
      await (
        await (await loginpagePractice.getRadioButton(1)).nextElement()
      ).isSelected()
    ).toEqual(true);
  });

  it("Handling dropdowns in Login page, tag:Smoke", async () => {
    (await loginpagePractice.getSelectElement).selectByAttribute(
      "value",
      "teach"
    );
    await browser.waitUntil(
      async () =>
        (await (await loginpagePractice.getSelectElement).getValue()) ===
        "teach"
    );
    expect(await (await loginpagePractice.getSelectElement).getValue()).toEqual(
      "teach"
    );

    (await loginpagePractice.getSelectElement).selectByVisibleText(
      "Consultant"
    );
    await browser.waitUntil(
      async () =>
        (await (await loginpagePractice.getSelectElement).getValue()) ===
        "consult"
    );
    expect(await (await loginpagePractice.getSelectElement).getValue()).toEqual(
      "consult"
    );
  });
});
