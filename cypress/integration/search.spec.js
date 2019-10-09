describe("loading basic /search page", () => {
  it("visits the /search page", () => {
    cy.visit("http://localhost:3000/search");
  });

  it("displays the search input", () => {
    cy.get("input")
      .invoke("attr", "placeholder")
      .should("contain", "Search by title or author");
  });

  it("clicks on the back button", () => {
    cy.get("a")
      .click()
      .url()
      .should("include", "/");
  });
});
