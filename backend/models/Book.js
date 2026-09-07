const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        content: {
            type: String,
            default: "",
        },
    },
    {
        _id: true,
    }
);

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        author: {
            type: String,
            required: true,
        },

        subtitle: {
            type: String,
            default: "",
        },

        coverImage: {
            type: String,
            default: "",
        },

        chapters: {
            type: [chapterSchema],
            default: [],
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Book",
    bookSchema
);