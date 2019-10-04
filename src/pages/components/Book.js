import React from "react";

import ShelfChanger from "./ShelfChanger";

const Book = ({ book, addBook }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${book.imageLinks.thumbnail}")`
            }}
          ></div>
          <ShelfChanger addBook={addBook} book={book} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book && book.authors.map(author => <span key={author}>{author}</span>)}
        </div>
      </div>
    </li>
  );
};

export default Book;
