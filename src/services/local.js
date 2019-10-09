import { EMPTY_SHELVES } from "./data";

export function setStorage(key, values) {
  return localStorage.setItem(key, JSON.stringify(values));
}

export function getSavedBooks() {
  return localStorage.getItem("shelves")
    ? JSON.parse(localStorage.getItem("shelves"))
    : EMPTY_SHELVES;
}

export function getBooksCount() {
  return localStorage.getItem("totalBooks") ? localStorage.getItem("totalBooks") : 0;
}

export function getNumberOfBooksOnShelves(shelves) {
  return shelves
    .map(shelf => {
      return shelf.books;
    })
    .flat().length;
}

export function clearStorage() {
  localStorage.removeItem("shelves");
}
