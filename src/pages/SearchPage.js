import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import { search } from "./../BooksAPI";

import Book from "./components/Book";

class SearchPage extends Component {
  state = {
    query: "",
    results: []
  };

  handleChange = _.debounce(async query => {
    console.log(query);
    this.setState({ query });
    const results = await search(query);
    this.setState({ results });
  }, 500);

  render() {
    const { query, results } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => {
                this.handleChange(e.target.value);
              }}
            />
          </div>
        </div>

        {results.length > 0 && (
          <div className="search-books-results">
            <p>
              Showing {results.length} for search {query}.
            </p>
            <ol className="books-grid">
              {results.map(result => (
                <Book book={result} />
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  }
}

export default SearchPage;
