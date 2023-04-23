const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());
require("./connection/db");
const userSchema = require("./models/user.model");

app.post("/createUser", async (req, res) => {
    const { fullName, email, bookId } = req.body;
    await axios.get(process.env.BOOK_URL + "books/getBookById/" + bookId).then((getBook) => {
        if (!getBook.data.data) {
            return res.status(404).send({
                message: "Book not found!",
                isSuccess: false,
            });
        }
        const createUser = new userSchema({
            fullName,
            email,
            bookId,
        });
        createUser
            .save()
            .then((result) => {
                return res.status(200).send({
                    data: result,
                    message: "User created successfully.",
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
    }).catch((err) => {
        return res.status(500).send({
            error: err.message,
            message: "Something went wrong, please try again!",
            isSuccess: false,
        });
    });
});

app.get("/getUser", async (req, res) => {
    let getUser = await userSchema.find();
    let data = [];
    for (let i = 0; i < getUser.length; i++) {
        await axios
            .get(`${process.env.BOOK_URL}books/getBookById/` + getUser[i].bookId)
            .then((response) => {
                const dataObj = {};
                dataObj["fullName"] = getUser[i].fullName;
                dataObj["_id"] = getUser[i]._id;
                dataObj["email"] = getUser[i].email;
                dataObj["bookId"] = response.data.data;
                data.push(dataObj);
            })
            .catch((err) => {
                return res.status(500).send({
                    error: err.message,
                    message: "Something went wrong, please try again!",
                    isSuccess: false,
                });
            });
    }
    return res.status(200).send({
        data,
        message: "Get user data successfully.",
        isSuccess: true,
    });
});

app.listen(3002, (err) => {
    if (err) throw err;
    console.log("Server starting at port 3002");
});
