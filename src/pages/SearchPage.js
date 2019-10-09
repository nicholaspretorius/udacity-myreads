import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import { search } from "./../BooksAPI";

import Book from "./components/Book";

class SearchPage extends Component {
  state = {
    query: "",
    hasSearched: false,
    results: []
  };

  handleChange = _.debounce(async query => {
    this.setState({ query });
    let results = [];

    if (query !== "") {
      results = await search(query);
      this.setState({ hasSearched: true });
    }

    this.setState({ results });
  }, 500);

  flattenShelves(shelves) {
    return shelves
      .map(shelf => {
        return shelf.books;
      })
      .flat();
  }

  render() {
    let { results } = this.state;
    const { query, hasSearched } = this.state;
    const { addBook, removeBook, shelves } = this.props;

    let flatShelves = this.flattenShelves(shelves);

    results = _.differenceBy(results, flatShelves, "id");

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              autoFocus
              onChange={e => {
                this.handleChange(e.target.value);
              }}
            />
          </div>
        </div>

        {hasSearched && results.length > 0 && (
          <div className="search-books-results">
            <p>
              Showing {results.length} {results.length === 1 ? "result" : "results"} for search '
              {query}'.
            </p>
            <ol className="books-grid">
              {results.map(result => (
                <Book key={result.id} book={result} addBook={addBook} removeBook={removeBook} />
              ))}
            </ol>
          </div>
        )}
        {hasSearched && results.length === 0 && (
          <div className="search-books-results">
            <p>There are no results for that query.</p>
          </div>
        )}
      </div>
    );
  }
}

export default SearchPage;
