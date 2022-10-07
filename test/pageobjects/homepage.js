class HomePage {
  async clickLoginSignupButton() {
    const loginButtonText = await $(
      '[data-csa-c-content-id="nav_ya_signin"] span'
    );

    // Click on Login Button
    await (await $('[data-csa-c-content-id="nav_ya_signin"]')).click();
  }

  get getPageTitle() {
    return $('h2[class*="a-size-large"]').getText();
  }
}

module.exports = new HomePage();
