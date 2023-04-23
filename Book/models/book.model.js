const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = new mongoose.model("book", userSchema);