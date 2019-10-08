describe("adding 1 book from /search page", () => {
  it("visits the /search page", () => {
    cy.visit("http://localhost:3000/search");
  });

  it("displays the search input", () => {
    cy.get("input")
      .invoke("attr", "placeholder")
      .should("contain", "Search by title or author");
  });

  it("type query 'Art'", () => {
    cy.get("input")
      .type("art")
      .should("have.value", "Art");

    cy.contains("Showing 20 results for search 'Art'.");

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

describe("loading home page (/) with 1 book in bookshelf", () => {
  it("displays the number of books with count (1) in the bookshelf title", () => {
    cy.get("h2").contains("Want to Read");
    cy.get("h2>span").contains("(1 book)");
  });

  it("find the 'delete' button", () => {
    cy.get("button.btn-delete").contains("X");
  });

  it("select category 'Current Reading' adds the book to the 'Currently Reading' bookshelf", () => {
    cy.get("select")
      .first()
      .select("Currently Reading");

    cy.get("h2").contains("Currently Reading (1 book)");
  });

  it("select category 'Read' adds the book to the 'Read' bookshelf", () => {
    cy.get("select")
      .first()
      .select("Read");

    cy.get("h2").contains("Read (1 book)");
  });

  it("select category 'None' removes the book from the bookshelf", () => {
    cy.get("select")
      .first()
      .select("None");

    cy.get("div.list-books-content").contains("Please add some books...");
    cy.get("h1").contains("My Reads");
  });
});
