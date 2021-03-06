import React, { Component } from "react";
import { Link } from "react-router-dom";

import Bookshelf from "./components/Bookshelf";
import PageTitle from "./components/PageTitle";
import { getNumberOfBooksOnShelves } from "./../services/local";

class MyBooksPage extends Component {
  render() {
    const { shelves, addBook, removeBook, deleteAll } = this.props;
    const total = getNumberOfBooksOnShelves(shelves);

    return (
      <div className="list-books">
        <PageTitle title={total > 0 ? `My Reads (${total})` : "My Reads"} />
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
                    removeBook={removeBook}
                  />
                ) : (
                  ""
                )
              )}
            </div>
          )}
        </div>
        {total > 0 && (
          <div className="delete">
            <button className="btn-delete" type="button" onClick={deleteAll}>
              X
            </button>
          </div>
        )}
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default MyBooksPage;
