import { Value } from "webdriverio/build/commands/element/addValue";

class LoginPage {
  // Get value methods
  get getSignInPageTitle() {
    return $("h1.a-spacing-small").getText();
  }
  get getMobileorEmailIdField() {
    return $("#ap_email");
  }
  get getPasswordField() {
    return $("#ap_password");
  }

  // Set value methods
  setMobileorEmailId(emailId) {
    this.getMobileorEmailIdField.isDisplayed();
    this.getMobileorEmailIdField.setValue(emailId);
  }
  setPassword(password) {
    this.getPasswordField.isDisplayed();
    this.getPasswordField.setValue(password);
  }

  // Action methods
  async clickContinueButton() {
    await $("#continue").click();
  }
  async clickSignInButton() {
    await (await $("#signInSubmit")).click();
  }
}

module.exports = new LoginPage();
