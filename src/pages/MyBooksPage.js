import React, { Component } from "react";
import { Link } from "react-router-dom";

import Bookshelf from "./components/Bookshelf";
import PageTitle from "./components/PageTitle";

class MyBooksPage extends Component {
  state = {};

  componentDidMount() {}

  render() {
    const { shelves, addBook, total } = this.props;

    return (
      <div className="list-books">
        <PageTitle title="My Reads" />
        <div className="list-books-content">
          {total === 0 ? (
            <div className="bookshelf">
              <p>Please add some books...</p>
            </div>
          ) : (
            <div>
              {shelves.map(shelf =>
                shelf.books.length > 0 ? (
                  <Bookshelf
                    key={shelf.id}
                    name={shelf.name}
                    books={shelf.books}
                    addBook={addBook}
                  />
                ) : (
                  ""
                )
              )}
            </div>
          )}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default MyBooksPage;
