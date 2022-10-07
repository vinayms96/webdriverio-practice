class AutomationPractice {
  get getDropdownInputField() {
    return $("input#autocomplete");
  }
  get getDynamicDropdown() {
    return $$(".ui-menu-item div");
  }
  get getCheckboxes() {
    return $$("#checkbox-example input");
  }
  get getAlertInputField() {
    return $("#name");
  }
  get getWebSortedList() {
    return $$("tr td:nth-child(1)");
  }
  get getTableHeader() {
    return $("tr th:nth-child(1)");
  }
  get getTableSearchField() {
    return $("div #search-field");
  }

  async clickAlertButton() {
    (await $("#alertbtn")).click();
  }
  clickCheckboxOption(optionId) {
    $(`#checkBoxOption${optionId}`).click();
  }
}

module.exports = new AutomationPractice();
