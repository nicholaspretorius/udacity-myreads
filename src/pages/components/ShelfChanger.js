import React from "react";

const ShelfChanger = ({ book, addBook, removeBook }) => {
  const options = [
    {
      value: "wantToRead",
      label: "Want to Read"
    },
    {
      value: "currentlyReading",
      label: "Currently Reading"
    },
    {
      value: "read",
      label: "Read"
    },
    {
      value: "none",
      label: "None"
    }
  ];

  return (
    <div className="book-shelf-changer">
      <select
        onChange={e =>
          e.target.value === "none" ? removeBook(book) : addBook(book, e.target.value)
        }
        defaultValue={book.shelf ? book.shelf : "move"}
      >
        <option value="move" disabled>
          Move to...
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ShelfChanger;
