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
    ]
  };

  handleAddBookToShelf = (book, shelf) => {
    const shelves = [...this.state.shelves];
    const index = shelves.findIndex(s => s.id === shelf);
    shelves[index].books = [...shelves[index].books, book];
    this.setState({ shelves });
  };

  render() {
    const { shelves } = this.state;
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
            <MyBooksPage shelves={shelves} {...props} addBook={this.handleAddBookToShelf} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
