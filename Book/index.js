const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
require("./connection/db");
const bookSchema = require("./models/book.model");

app.post("/createBook", (req, res) => {
    const { bookName, price } = req.body;
    const createBook = new bookSchema({
        bookName,
        price,
    });
    createBook
        .save()
        .then((result) => {
            return res.status(200).send({
                data: result,
                message: "Book created successfully.",
                isSuccess: true,
            });
        })
        .catch((err) => {
            return res.status(500).send({
                error: err.message,
                message: "Something went wrong, please try again!",
                isSuccess: false,
            });
        });
});

app.get("/getBookById/:Id", async (req, res) => {
    const bookId = req.params.Id;
    await bookSchema
        .findById(bookId)
        .then((result) => {
            if(!result){
                return res.status(404).send({
                    message: "Boook not found.",
                    isSuccess: true,
                });
            }
            return res.status(200).send({
                data: result,
                message: "Get boook data successfully.",
                isSuccess: true,
            });
        })
        .catch((err) => {
            return res.status(500).send({
                error: err.message,
                message: "Something went wrong, please try again!",
                isSuccess: false,
            });
        });
});

app.listen(3001, (err) => {
    if (err) throw err;
    console.log("Server starting at port 3001");
});
