describe("adding 1 book from /search page", () => {
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
      .eq(1)
      .select("Want to Read")
      .should("have.value", "wantToRead");

    cy.get("select")
      .eq(2)
      .select("Currently Reading")
      .should("have.value", "currentlyReading");

    cy.get("select")
      .eq(3)
      .select("Read")
      .should("have.value", "read");

    cy.get("select")
      .eq(4)
      .select("None")
      .should("have.value", "none");
  });

  it("clicks on the back button", () => {
    cy.get("a")
      .click()
      .url()
      .should("include", "/");
  });

  it("displays the number of books with count (3) in the header", () => {
    cy.get("h1").contains("My Reads (3)");
  });
});

describe("loading home page (/) with 3 books in 3 bookshelves", () => {
  it("displays the number of books with count (1) in the bookshelf title", () => {
    cy.get("h2")
      .eq(0)
      .contains("Currently Reading (1 book)");

    cy.get("h2")
      .eq(1)
      .contains("Want to Read (1 book)");

    cy.get("h2")
      .eq(2)
      .contains("Read (1 book)");
  });
});

describe("moving 1 book from 'Want to Read' to 'Currently Reading'", () => {
  it("select category 'Currently Reading' adds the book to the 'Currently Reading' bookshelf", () => {
    cy.get("select")
      .eq(1)
      .select("Currently Reading");

    cy.get("h1").contains("My Reads (3)");
    cy.get("h2")
      .eq(0)
      .contains("Currently Reading (2 books)");
    cy.get("h2")
      .eq(1)
      .contains("Read (1 book)");
  });
});

describe("moving 1 book from 'Curently Reading' to 'Read'", () => {
  it("select category 'Read' adds the book to the 'Read' bookshelf", () => {
    cy.get("select")
      .first()
      .select("Read");

    cy.get("h1").contains("My Reads (3)");
    cy.get("h2")
      .eq(0)
      .contains("Currently Reading (1 book)");
    cy.get("h2")
      .eq(1)
      .contains("Read (2 books)");
  });
});

describe("moving another book from 'Curently Reading' to 'Read'", () => {
  it("select category 'Read' adds the book to the 'Read' bookshelf", () => {
    cy.get("select")
      .first()
      .select("Read");

    cy.get("h1").contains("My Reads (3)");
    cy.get("h2")
      .eq(0)
      .contains("Read (3 books)");
  });
});

describe("removing all the books", () => {
  it("find and click on the 'delete' button", () => {
    cy.get("button.btn-delete")
      .contains("X")
      .click();
  });

  it("should have no books on the bookshelf", () => {
    cy.get("h1").contains("My Reads");
    cy.get("button.btn-delete").should("not.exist");
    cy.get("div.bookshelf").contains("Please add some books...");
  });
});
