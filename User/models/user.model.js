const mongoose = require("mongoose");
const book = require('../../Book/models/book.model')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book"
    }
}, {
    timestamps: true
});

module.exports = new mongoose.model("user", userSchema);