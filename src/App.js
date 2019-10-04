import React from "react";
import { Route } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import "./App.css";

import MyBooksPage from "./pages/MyBooksPage";
import SearchPage from "./pages/SearchPage";

class BooksApp extends React.Component {
  state = {
    shelves: [
      {
        id: "currentlyReading",
        name: "Currently Reading",
        books: []
      },
      {
        id: "wantToRead",
        name: "Want to Read",
        books: []
      },
      {
        id: "read",
        name: "Read",
        books: []
      }
    ],
    totalBooks: 0
  };

  removeBookFromExistingShelf = book => {
    const shelves = [...this.state.shelves];

    shelves.map(shelf => {
      const updated = shelf.books.filter(b => {
        return b.id !== book;
      });
      shelf.books = [...updated];
      return shelf;
    });

    this.setState({ shelves });
  };

  handleAddBookToShelf = (book, shelf) => {
    console.log("Book: ", book);
    this.removeBookFromExistingShelf(book.id);

    const newBook = {
      id: book.id,
      title: book.title,
      subtitle: book.subtitle,
      authors: book.authors,
      shelf: shelf,
      averageRating: book.averageRating,
      ratingsCount: book.ratingsCount,
      categories: book.categories,
      imageLinks: book.imageLinks
    };

    const shelves = [...this.state.shelves];
    if (shelf !== "none") {
      const shelfIndex = shelves.findIndex(s => s.id === shelf);
      shelves[shelfIndex].books = [...shelves[shelfIndex].books, newBook];
      this.addBookToTotal();
      this.setState({ shelves });
    }
  };

  addBookToTotal() {
    this.setState(currentState => ({
      totalBooks: currentState.totalBooks + 1
    }));
  }

  render() {
    const { shelves, totalBooks } = this.state;
    return (
      <div className="app">
        <Route
          path="/search"
          render={props => <SearchPage addBook={this.handleAddBookToShelf} />}
        />
        <Route
          path="/"
          exact
          render={props => (
            <MyBooksPage
              shelves={shelves}
              addBook={this.handleAddBookToShelf}
              total={totalBooks}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
