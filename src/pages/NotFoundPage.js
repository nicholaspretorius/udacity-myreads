import React from "react";
import { Link } from "react-router-dom";

import PageTitle from "./components/PageTitle";

const NotFoundPage = () => {
  return (
    <div className="list-books">
      <PageTitle title="My Reads" />
      <div className="list-books-content">
        <div className="bookshelf">
          <h3>Page Not Found.</h3>
          <p>Seems like you mighe be lost...</p>
          <Link to="/">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
