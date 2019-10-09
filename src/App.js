import React from "react";
import { Switch, Route } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import "./App.css";

import MyBooksPage from "./pages/MyBooksPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import { getSavedBooks, setStorage, clearStorage } from "./services/local";
import { EMPTY_SHELVES } from "./services/data";

class BooksApp extends React.Component {
  state = {
    shelves: EMPTY_SHELVES
  };

  componentDidMount() {
    const shelves = getSavedBooks();
    this.setState({ shelves });
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

      this.setState({ shelves });
      localStorage.setItem("shelves", JSON.stringify(shelves));
    }
  };

  handleRemoveBook = book => {
    this.removeBookFromExistingShelf(book.id);
  };

  clearLocalStorage = () => {
    clearStorage();
    this.setState({ shelves: this.emptyShelves() });
  };

  emptyShelves() {
    return [
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
  }

  render() {
    const { shelves } = this.state;
    return (
      <div className="app">
        <Switch>
          <Route
            path="/search"
            render={() => (
              <SearchPage
                addBook={this.handleAddBookToShelf}
                removeBook={this.handleRemoveBook}
                shelves={shelves}
              />
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
