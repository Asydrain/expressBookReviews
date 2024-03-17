const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
        const username = req.body.username;
        const password = req.body.password;
      
        if (username && password) {
          if (!isValid(username)) { 
            users.push({"username":username,"password":password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
          } else {
            return res.status(404).json({message: "User already exists!"});    
          }
        } 
        return res.status(404).json({message: "Unable to register user."});
});

// TASK 1 Get the book list available in the shop
public_users.get('/',function (req, res) {
    let getAllBooks = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(res.send(JSON.stringify({books},null,4)));
        });
    });
});

// TASK 2 Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let getBooksByIsbn = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(
                res.send(books[isbn])
            );
        });
    });
 });
  
// TASK 3 Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const keys = Object.keys(books);
    const author = req.params.author;
    let filtered_keys = keys.filter((key) => books[key].author === author);
    if (filtered_keys.length > 0) {
        let getBooksByAuthor = new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve(
                    res.send(filtered_keys.map(key => books[key]))
                );
                reject(
                    res.send("No books by that author found.")
                );
            });
        });
    }
});

// TASK 4 Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const keys = Object.keys(books);
    const title = req.params.title;
    let filtered_keys = keys.filter((key) => books[key].title === title);
    if (filtered_keys.length > 0) {
        let getBooksByTitle = new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve(
                    res.send(filtered_keys.map(key => books[key]))
                );
                reject(
                    res.send("No books by that title found.")
                );
            });
        });            
    }  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const keys = Object.keys(books);
    const isbn = req.params.isbn;
        res.send(books[isbn].reviews);
});

module.exports.general = public_users;
