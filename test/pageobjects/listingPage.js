class ListingPage {
  get getPageTitle() {
    return $("div h1");
  }
  get getProductsList() {
    return $$("app-card-list app-card");
  }
}

module.exports = new ListingPage();
