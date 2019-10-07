describe("loading /search page", () => {
  it("visits the /search page", () => {
    cy.visit("http://localhost:3000/search");
  });

  it("displays the search input", () => {
    cy.get("input")
      .invoke("attr", "placeholder")
      .should("contain", "Search by title or author");
  });

  it("type query 'art'", () => {
    cy.get("input")
      .type("art")
      .should("have.value", "art");

    cy.contains("Showing 20 results for search 'art'.");

    cy.get("select")
      .first()
      .select("Want to Read")
      .should("have.value", "wantToRead");
  });

  it("click on the back button", () => {
    cy.get("a")
      .click()
      .url()
      .should("include", "/");
  });

  it("displays the number of books with count (1) in the header", () => {
    cy.get("h1").contains("My Reads (1)");
  });
});
