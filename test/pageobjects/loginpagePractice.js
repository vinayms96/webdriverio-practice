class LoginPagePractice {
  // constructor(first) {
  //   this.first = first;
  // }
  get getUsernameField() {
    return $("#username");
  }
  get getPasswordField() {
    return $("#password");
  }
  get getPopupElement() {
    return $("div#myModal");
  }
  getRadioButton(index) {
    return $(`label:nth-child(${index}) > span.radiotextsty`);
  }
  get getSelectElement() {
    return $("select.form-control");
  }
  get getBlinkingText() {
    return $("body .blinkingText");
  }
  get getLoginPageErrorMsg() {
    return $("div.alert-danger");
  }
  get getSignInButton() {
    return $('#signInBtn');
  }

  setUsername(username) {
    this.getUsernameField.setValue(username);
  }
  setPassword(password) {
    this.getPasswordField.setValue(password);
  }

  async clickRadioButton(index) {
    (await $(`label:nth-child(${index}) > span.radiotextsty`)).click();
  }
  async clickPopupCancelButton() {
    await $('[class*="modal-footer"] #cancelBtn').click();
  }
  async clickPopupOkButton() {
    await $('[class*="modal-footer"] #okayBtn').click();
  }
};

module.exports = new LoginPagePractice();