describe("adding 1 book from /search page", () => {
  it("visits the /search page", () => {
    cy.visit("http://localhost:3000/search");
  });

  it("displays the search input", () => {
    cy.get("input")
      .invoke("attr", "placeholder")
      .should("contain", "Search by title or author");
  });

  it("type query 'development'", () => {
    cy.get("input")
      .type("development")
      .should("have.value", "development");

    cy.contains("Showing 20 results for search 'development'.");

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

  it("reloads the page and maintains the number of books (3)", () => {
    const shelves = `[{"id":"currentlyReading","name":"Currently Reading","books":[{"id":"zLFSPdIuqKsC","title":"Artificial Intelligence","subtitle":"The Very Idea","authors":["John Haugeland"],"shelf":"currentlyReading","averageRating":4.5,"ratingsCount":2,"categories":["Computers"],"imageLinks":{"smallThumbnail":"http://books.google.com/books/content?id=zLFSPdIuqKsC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api","thumbnail":"http://books.google.com/books/content?id=zLFSPdIuqKsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"}}]},{"id":"wantToRead","name":"Want to Read","books":[{"id":"8jZBksh-bUMC","title":"Artificial Intelligence","subtitle":"A Modern Approach","authors":["Stuart Jonathan Russell","Peter Norvig"],"shelf":"wantToRead","averageRating":4.5,"ratingsCount":10,"categories":["Computers"],"imageLinks":{"smallThumbnail":"http://books.google.com/books/content?id=8jZBksh-bUMC&printsec=frontcover&img=1&zoom=5&source=gbs_api","thumbnail":"http://books.google.com/books/content?id=8jZBksh-bUMC&printsec=frontcover&img=1&zoom=1&source=gbs_api"}}]},{"id":"read","name":"Read","books":[{"id":"eH6jBQAAQBAJ","title":"Paradigms of Artificial Intelligence Programming","subtitle":"Case Studies in Common Lisp","authors":["Peter Norvig"],"shelf":"read","averageRating":5,"ratingsCount":1,"categories":["Computers"],"imageLinks":{"smallThumbnail":"http://books.google.com/books/content?id=eH6jBQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api","thumbnail":"http://books.google.com/books/content?id=eH6jBQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"}}]}]`;
    window.localStorage.setItem("shelves", shelves);
    window.localStorage.setItem("totalBooks", "3");
    cy.reload();
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

  it("should not load any books from localStorage", () => {
    cy.reload();
    cy.get("h1").contains("My Reads");
  });
});
