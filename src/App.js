import React from "react";
import { Switch, Route } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import "./App.css";

import MyBooksPage from "./pages/MyBooksPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import { SHELVES } from "./services/data";
import { getSavedBooks, getBooksCount, setStorage, clearStorage } from "./services/local";

class BooksApp extends React.Component {
  state = {
    shelves: [],
    totalBooks: 0
  };

  componentDidMount() {
    const shelves = getSavedBooks();
    const totalBooks = getBooksCount();

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
    setStorage("shelves", shelves);
    // localStorage.setItem("shelves", JSON.stringify(shelves));
  };

  handleAddBookToShelf = (book, shelf) => {
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
    this.removeBookFromExistingShelf(book.id);
    if (book.shelf) {
      this.removeBookFromTotal();
    }
  };

  addBookToTotal() {
    this.setState(currentState => {
      const total = currentState.totalBooks + 1;
      setStorage("totalBooks", total);
      return { totalBooks: total };
    });
  }

  removeBookFromTotal() {
    this.setState(currentState => {
      const total = currentState.totalBooks - 1;
      setStorage("totalBooks", total);
      return { totalBooks: total };
    });
  }

  clearLocalStorage = () => {
    clearStorage();
    this.setState({ totalBooks: 0, shelves: SHELVES });
  };

  render() {
    const { shelves, totalBooks } = this.state;
    return (
      <div className="app">
        <Switch>
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
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
