import _ from "lodash";

export function setStorage(key, values) {
  return localStorage.setItem(key, JSON.stringify(values));
}

export function getSavedBooks() {
  return localStorage.getItem("shelves")
    ? JSON.parse(localStorage.getItem("shelves"))
    : [
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

export function getBooksCount() {
  return localStorage.getItem("totalBooks") ? localStorage.getItem("totalBooks") : 0;
}

export function getNumberOfBooksOnShelves(shelves) {
  const flatShelf = shelves.map(shelf => {
    return shelf.books;
  });
  return _.flatten(flatShelf).length;
}

export function clearStorage() {
  localStorage.removeItem("shelves");
}
