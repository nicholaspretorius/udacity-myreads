describe("Loading Home page", () => {
  it("visits the page", () => {
    cy.visit("http://localhost:3000/blah");
  });

  it("displays the correct titles text", () => {
    cy.get("h1").contains("My Reads");
    cy.get("h3").contains("Page Not Found.");
  });

  it("find and click on the 'Home' link'", () => {
    cy.get("a")
      .contains("Home")
      .click()
      .url()
      .should("include", "/");
  });
});
