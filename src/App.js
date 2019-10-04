import React from "react";
import { Route } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import "./App.css";

import MyBooksPage from "./pages/MyBooksPage";
import SearchPage from "./pages/SearchPage";

const SHELVES = [
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
];

class BooksApp extends React.Component {
  state = {
    shelves: SHELVES,
    totalBooks: 0
  };

  componentDidMount() {
    const shelves = localStorage.getItem("shelves")
      ? JSON.parse(localStorage.getItem("shelves"))
      : this.state.shelves;

    const totalBooks = localStorage.getItem("totalBooks")
      ? localStorage.getItem("totalBooks")
      : this.state.totalBooks;

    this.setState({ shelves, totalBooks });
  }

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
    localStorage.setItem("shelves", JSON.stringify(shelves));
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
      if (!book.shelf) {
        this.addBookToTotal();
      }
      this.setState({ shelves });
      localStorage.setItem("shelves", JSON.stringify(shelves));
    }
  };

  handleRemoveBook = book => {
    console.log("Remove book: ", book);
    this.removeBookFromExistingShelf(book.id);
    if (book.shelf) {
      this.removeBookFromTotal();
    }
  };

  addBookToTotal() {
    this.setState(currentState => {
      const total = currentState.totalBooks + 1;
      localStorage.setItem("totalBooks", total);
      return { totalBooks: total };
    });
  }

  removeBookFromTotal() {
    this.setState(currentState => {
      const total = currentState.totalBooks - 1;
      localStorage.setItem("totalBooks", total);
      return { totalBooks: total };
    });
  }

  clearLocalStorage = () => {
    localStorage.removeItem("shelves");
    localStorage.removeItem("totalBooks");
    this.setState({ totalBooks: 0, shelves: SHELVES });
  };

  render() {
    const { shelves, totalBooks } = this.state;
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchPage addBook={this.handleAddBookToShelf} removeBook={this.handleRemoveBook} />
          )}
        />
        <Route
          path="/"
          exact
          render={props => (
            <MyBooksPage
              shelves={shelves}
              addBook={this.handleAddBookToShelf}
              removeBook={this.handleRemoveBook}
              deleteAll={this.clearLocalStorage}
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
