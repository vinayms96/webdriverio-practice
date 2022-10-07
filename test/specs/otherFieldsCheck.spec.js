/// <reference types="webdriverio/async"/>
/// <reference types="expect-webdriverio"/>

const chaiexpect = require("chai").expect;

const automationPractice = require("../pageobjects/automationPractice");

describe("Other UI Field Checks", async () => {
  beforeEach(async () => {
    await browser.url("/AutomationPractice/");
    await browser.maximizeWindow();
  });

  it("Handling Dynamic Dropdowns", async () => {
    (await automationPractice.getDropdownInputField).setValue("ind");
    await browser.pause(2000);

    let dropdown = await automationPractice.getDynamicDropdown;

    for (let items = 0; items < dropdown.length; items++) {
      if ((await dropdown[items].getText()) === "India") {
        await dropdown[items].click();
      }
    }
    console.log(
      await (await automationPractice.getDropdownInputField).getValue()
    );
  });

  it("Handling Checkboxes", async () => {
    const checkboxes = automationPractice.getCheckboxes;
    for (let list = 0; list < (await checkboxes.length); list++) {
      expect(await checkboxes[list].isSelected()).toEqual(false);
    }

    // Select first checkbox
    automationPractice.clickCheckboxOption(1);
    await browser.waitUntil(async () => await checkboxes[0].isSelected());
    for (let list = 0; list < (await checkboxes.length); list++) {
      list === 0
        ? expect(await checkboxes[list].isSelected()).toEqual(true)
        : expect(await checkboxes[list].isSelected()).toEqual(false);
    }
    automationPractice.clickCheckboxOption(1);

    // Select second checkbox
    automationPractice.clickCheckboxOption(2);
    await browser.waitUntil(async () => await checkboxes[1].isSelected());
    for (let list = 0; list < (await checkboxes.length); list++) {
      list === 1
        ? expect(await checkboxes[list].isSelected()).toEqual(true)
        : expect(await checkboxes[list].isSelected()).toEqual(false);
    }
    automationPractice.clickCheckboxOption(2);

    // Select yhird checkbox
    automationPractice.clickCheckboxOption(3);
    await browser.waitUntil(async () => await checkboxes[2].isSelected());
    for (let list = 0; list < (await checkboxes.length); list++) {
      list === 2
        ? expect(await checkboxes[list].isSelected()).toEqual(true)
        : expect(await checkboxes[list].isSelected()).toEqual(false);
    }
    automationPractice.clickCheckboxOption(3);

    // Select all checkboxes
    automationPractice.clickCheckboxOption(1);
    automationPractice.clickCheckboxOption(2);
    automationPractice.clickCheckboxOption(3);
    await browser.waitUntil(async () => await checkboxes[2].isSelected());
    for (let list = 0; list < (await checkboxes.length); list++) {
      expect(await checkboxes[list].isSelected()).toEqual(true);
    }
  });

  it("Handling Alert Popups", async () => {
    await (await automationPractice.getAlertInputField).setValue("Testing");
    automationPractice.clickAlertButton();
    await browser.waitUntil(async () => (await browser.isAlertOpen()) === true);
    chaiexpect(await browser.isAlertOpen()).to.be.true;
    chaiexpect(await browser.getAlertText()).to.equal(
      "Hello Testing, share this practice page and share your knowledge"
    );
    await browser.acceptAlert();
    await browser.waitUntil(
      async () => (await browser.isAlertOpen()) === false
    );
    chaiexpect(await browser.isAlertOpen()).to.be.false;
  });

  it("Handling Sorting Table", async () => {
    await browser.url("/seleniumPractise/#/offers");
    (await automationPractice.getTableHeader).click();
    await browser.waitUntil(
      async () =>
        (await (await $("tr th:nth-child(1)")).getAttribute("aria-sort")) ===
        "ascending"
    );
    const webSortedList = await automationPractice.getWebSortedList.map(
      (list) => list.getText()
    );
    console.log(webSortedList);
    const copyWebSortedList = webSortedList.slice();
    console.log(copyWebSortedList.sort());
    expect(webSortedList).toEqual(copyWebSortedList.sort());
  });

  it("Table Value Search", async () => {
    await browser.url("/seleniumPractise/#/offers");
    await (await automationPractice.getTableSearchField).setValue("tomato");
    console.log(`Count: ${await automationPractice.getWebSortedList.length}`);
    await expect(automationPractice.getWebSortedList).toBeElementsArrayOfSize(
      1
    );
    console.log(
      `Left Option: ${await automationPractice.getWebSortedList[0].getText()}`
    );
    await expect(automationPractice.getWebSortedList[0]).toHaveText("Tomato");
  });
});
