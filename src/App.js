import React from "react";
import { Route } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import "./App.css";

import MyBooksPage from "./pages/MyBooksPage";
import SearchPage from "./pages/SearchPage";

class BooksApp extends React.Component {
  state = {};

  render() {
    return (
      <div className="app">
        <Route path="/search" component={SearchPage} />
        <Route path="/" exact component={MyBooksPage} />
      </div>
    );
  }
}

export default BooksApp;
