describe("Entering an invalid query", () => {
  it("visits the /search page", () => {
    cy.visit("http://localhost:3000/search");
  });

  it("displays the search input", () => {
    cy.get("input")
      .invoke("attr", "placeholder")
      .should("contain", "Search by title or author");
  });

  it("type query 'blah'", () => {
    cy.get("input")
      .type("blah")
      .should("have.value", "blah");

    cy.contains("There are no results for that query.");
  });

  it("clicks on the back button", () => {
    cy.get("a")
      .click()
      .url()
      .should("include", "/");
  });
});
