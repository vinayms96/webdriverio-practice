/// <reference types="webdriverio/async"/>
/// <reference types="expect-webdriverio"/>

const chaiexpect = require("chai").expect;

const loginpagePractice = require("../pageobjects/loginpagePractice");

describe("Handling Switching Windows", async () => {
  beforeEach(async () => {
    await browser.url("/loginpagePractise/");
    await browser.maximizeWindow();
  });

  it("Switch between windows", async () => {
    await (await loginpagePractice.getBlinkingText).click();
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    console.log(`Child Title: ${await browser.getTitle()}`);
    expect(await $("h1").getText()).toEqual("DOCUMENTS REQUEST");
    await browser.closeWindow();
    await browser.switchToWindow(handles[0]);
    console.log(`Parent Title: ${await browser.getTitle()}`);
  });

  /**
   * switchWindow() method is used when new tab is opened by automation.
   * switchToWindow() method is used when new tab is opened by webpage.
   */
  it("Handling new window", async () => {
    await (await loginpagePractice.getBlinkingText).click();
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    console.log(`Child Title: ${await browser.getTitle()}`);
    expect(await $("h1").getText()).toEqual("DOCUMENTS REQUEST");
    await browser.closeWindow();
    await browser.switchToWindow(handles[0]);
    console.log(`Parent Title: ${await browser.getTitle()}`);

    await browser.newWindow("https://www.facebook.com");
    console.log(`New Tab opened by Automation: ${await browser.getTitle()}`);
    await browser.closeWindow();
    // Switching back to parent window
    await browser.switchWindow("/loginpagePractise/");
    console.log(`After switching back to parent: ${await browser.getTitle()}`);
  });

  it("Switching back to parent after new tab by automation", async () => {
    await (await loginpagePractice.getBlinkingText).click();
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    console.log(`Child Title: ${await browser.getTitle()}`);
    expect(await $("h1").getText()).toEqual("DOCUMENTS REQUEST");
    await browser.closeWindow();
    await browser.switchToWindow(handles[0]);
    console.log(`Parent Title: ${await browser.getTitle()}`);

    await browser.newWindow("https://www.facebook.com");
    console.log(`New Tab opened by Automation: ${await browser.getTitle()}`);
    // Switching back to parent window
    const newHandles = await browser.getWindowHandles();
    await browser.switchToWindow(newHandles[0]);
    console.log(`After switching back to parent: ${await browser.getTitle()}`);
  });

  it("Switching to Frames", async () => {
    await browser.url("/AutomationPractice/");

    // Switching from main page to iFrame
    await (await $("iframe")).scrollIntoView();
    console.log(`Main Page Links: ${await $$("a").length}`);
    await browser.switchToFrame(await $("#courses-iframe"));
    console.log(`iFrame Links: ${await $$("a").length}`);

    // Switching back to main page
    await browser.switchToFrame(null);
    console.log(`Main Page Links: ${await $$("a").length}`);
  });
});
