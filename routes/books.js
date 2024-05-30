const express = require("express");

// Data import
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
// const { route } = require("./users");

// Local Router
const router = express.Router();

/*
    Route: /
    Method: GET
    Desc: Get all books
    Access: Public
    Parameters: None
*/

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get All The Books...",
    data: books,
  });
});

/*
    Route: /:id
    Method: GET
    Desc: Get Books By Id
    Access: Public
    Parameters: None
*/

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    res.status(404).json({
      success: false,
      message: "Book Not Found :(",
    });
  }
  res.status(200).json({
    success: true,
    message: "Book Found :)",
    data: book,
  });
});

/*
    Route: /books/issued
    Method: GET
    Desc: Get All Books Issued
    Access: Public
    Parameters: None
*/

router.get("/issued/user", (req, res) => {
  const usersWithTheIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];

  usersWithTheIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Have Been Issued Yet...",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Users With The Issued Books...",
    data: issuedBooks,
  });
});

// Default Export
module.exports = router;
