import React, { Component } from "react";

import Book from "./Book";

class BookShelf extends Component {
  render() {
    const { name, books, addBook, removeBook } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {name}{" "}
          <span className="muted">
            ({books.length} {books.length === 1 ? "book" : "books"})
          </span>
        </h2>
        <div className="bookshelf-books">
          {books && (
            <ol className="books-grid">
              {books.map(book => (
                <Book key={book.id} book={book} addBook={addBook} removeBook={removeBook} />
              ))}
            </ol>
          )}
        </div>
      </div>
    );
  }
}

export default BookShelf;
