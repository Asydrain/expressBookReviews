const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify({books},null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn])
 });
  
// START HERE TASK 3 Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const keys = Object.keys(books);
    const author = req.params.author;
    let filtered_keys = keys.filter((key) => books[key].author === author);
    if (filtered_keys.length > 0) {
        res.send(filtered_keys.map(key => books[key]));
    } else {
        res.send("No books by that author found.")
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const keys = Object.keys(books);
    const title = req.params.title;
    let filtered_keys = keys.filter((key) => books[key].title === title);
    if (filtered_keys.length > 0) {
        res.send(filtered_keys.map(key => books[key]));
    } else {
        res.send("No books by that title found.")
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const keys = Object.keys(books);
    const isbn = req.params.isbn;
        res.send(books[isbn].reviews);
});

module.exports.general = public_users;
