import { SHELVES } from "./data";

export function setStorage(key, values) {
  return localStorage.setItem(key, JSON.stringify(values));
}

export function getSavedBooks() {
  return localStorage.getItem("shelves") ? JSON.parse(localStorage.getItem("shelves")) : SHELVES;
}

export function getBooksCount() {
  return localStorage.getItem("totalBooks") ? localStorage.getItem("totalBooks") : 0;
}

export function clearStorage() {
  localStorage.removeItem("shelves");
  localStorage.removeItem("totalBooks");
}

export function flattenShelves() {
  const shelves = localStorage.getItem("shelves")
    ? JSON.parse(localStorage.getItem("shelves"))
    : [];
  return shelves
    .map(shelf => {
      return shelf.books;
    })
    .flat();
}
