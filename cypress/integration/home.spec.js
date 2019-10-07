describe("Loading Home page", () => {
  it("visits the page", () => {
    cy.visit("http://localhost:3000");
  });

  it("displays the correct header text", () => {
    cy.get("h1").contains("My Reads");
  });

  it("click on the '+' button", () => {
    cy.get("div.open-search > a")
      .click()
      .url()
      .should("include", "/search");
  });
});
