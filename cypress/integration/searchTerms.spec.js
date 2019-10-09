describe("entering various search terms", () => {
  it("visits the /search page", () => {
    cy.visit("http://localhost:3000/search");
  });

  it("type query 'biography'", () => {
    cy.get("input")
      .type("biography")
      .should("have.value", "biography");

    cy.contains("Showing 20 results for search 'biography'.");
  });

  it("type query 'poetry'", () => {
    cy.get("input")
      .type("biography")
      .should("have.value", "biography");

    cy.contains("Showing 20 results for search 'biography'.");
  });

  it("type query 'thrun'", () => {
    cy.get("input")
      .type("thrun")
      .should("have.value", "thrun");

    cy.contains("Showing 20 results for search 'thrun'.");
  });

  it("type query 'Virtual Reality'", () => {
    cy.get("input")
      .type("Virtual Reality")
      .should("have.value", "Virtual Reality");

    cy.contains("Showing 20 results for search 'Virtual Reality'.");
  });
});
