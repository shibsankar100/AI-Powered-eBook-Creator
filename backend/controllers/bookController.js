const Book = require("../models/Book");
const fs = require("fs");
const path = require("path");

const isExternalUrl = (value) => {
    return (
        typeof value === "string" &&
        (
            value.startsWith("http://") ||
            value.startsWith("https://")
        )
    );
};

const getLocalFilePath = (coverImage) => {
    if (
        typeof coverImage !== "string" ||
        !coverImage.trim()
    ) {
        return null;
    }
    if (isExternalUrl(coverImage)) {
        return null;
    }

    const cleanPath = coverImage
        .trim()
        .replace(/^[/\\]+/, "")
        .replace(/\//g, path.sep);

    return path.join(
        __dirname,
        "..",
        cleanPath
    );
};

const deleteLocalCover = (coverImage) => {
    try {
        const imagePath =
            getLocalFilePath(coverImage);

        if (!imagePath) {
            return;
        }

        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);

            console.log(
                "Deleted cover image:",
                imagePath
            );
        }
    } catch (error) {
        console.error(
            "Could not delete cover image:",
            error.message
        );
    }
};


const createBook = async (req, res) => {
    try {
        const {
            title,
            author,
            subtitle,
            chapters,
        } = req.body;

        if (!req.user || !req.user._id) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        if (!title || !author) {
            return res.status(400).json({
                message:
                    "Please provide a title and author",
            });
        }

        let normalizedChapters = [];

        if (Array.isArray(chapters)) {
            normalizedChapters =
                chapters.map((chapter) => ({
                    title:
                        chapter?.title || "",

                    content:
                        chapter?.content || "",
                }));
        }

        const book = await Book.create({
            title: String(title).trim(),

            author: String(author).trim(),

            subtitle:
                subtitle
                    ? String(subtitle).trim()
                    : "",

            chapters:
                normalizedChapters,

            userId:
                req.user._id,
        });

        console.log("==============================");
        console.log("BOOK CREATED");
        console.log(
            "BOOK ID:",
            book._id.toString()
        );
        console.log(
            "USER ID:",
            req.user._id.toString()
        );
        console.log(
            "CHAPTER COUNT:",
            book.chapters.length
        );
        console.log("==============================");

        return res.status(201).json(book);

    } catch (error) {
        console.error(
            "CREATE BOOK ERROR:",
            error
        );

        return res.status(500).json({
            message:
                "Server error while creating book",
            error: error.message,
        });
    }
};


const getBooks = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                message:
                    "Authentication required",
            });
        }

        const books = await Book.find({
            userId: req.user._id,
        }).sort({
            createdAt: -1,
        });

        console.log("==============================");
        console.log("GET BOOKS");
        console.log(
            "USER:",
            req.user._id.toString()
        );
        console.log(
            "BOOK COUNT:",
            books.length
        );
        console.log("==============================");

        return res.status(200).json(books);

    } catch (error) {
        console.error(
            "GET BOOKS ERROR:",
            error
        );

        return res.status(500).json({
            message:
                "Server error while fetching books",
            error: error.message,
        });
    }
};


const getBookById = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                message:
                    "Authentication required",
            });
        }

        const book = await Book.findById(
            req.params.id
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        if (!book.userId) {
            return res.status(400).json({
                message:
                    "This book does not have a userId",
            });
        }

        if (
            book.userId.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Not authorized",
            });
        }

        console.log("==============================");
        console.log("GET SINGLE BOOK");
        console.log(
            "BOOK ID:",
            book._id.toString()
        );
        console.log(
            "USER:",
            req.user._id.toString()
        );
        console.log(
            "CHAPTER COUNT:",
            book.chapters.length
        );
        console.log(
            "COVER IMAGE:",
            book.coverImage
        );
        console.log("==============================");

        return res.status(200).json(book);

    } catch (error) {
        console.error(
            "GET BOOK ERROR:",
            error
        );

        return res.status(500).json({
            message:
                "Server error while fetching book",
            error: error.message,
        });
    }
};
const updateBook = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                message:
                    "Authentication required",
            });
        }
        const book = await Book.findById(
            req.params.id
        );
        if (!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        if (!book.userId) {
            return res.status(400).json({
                message:
                    "This book does not have a userId",
            });
        }

        if (
            book.userId.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Not authorized",
            });
        }

        if (
            req.body.title !== undefined
        ) {
            book.title =
                String(
                    req.body.title
                ).trim();
        }

        if (
            req.body.author !== undefined
        ) {
            book.author =
                String(
                    req.body.author
                ).trim();
        }

        if (
            req.body.subtitle !== undefined
        ) {
            book.subtitle =
                String(
                    req.body.subtitle
                ).trim();
        }

        if (
            Array.isArray(
                req.body.chapters
            )
        ) {
            book.chapters =
                req.body.chapters.map(
                    (chapter) => {

                        const newChapter = {
                            title:
                                chapter?.title ||
                                "",

                            content:
                                chapter?.content ||
                                "",
                        };

                        if (
                            chapter?._id
                        ) {
                            newChapter._id =
                                chapter._id;
                        }

                        return newChapter;
                    }
                );
        }

        const updatedBook =
            await book.save();

        console.log("==============================");
        console.log("BOOK UPDATED");
        console.log(
            "BOOK ID:",
            updatedBook._id.toString()
        );
        console.log(
            "CHAPTER COUNT:",
            updatedBook.chapters.length
        );
        console.log("==============================");

        return res.status(200).json(
            updatedBook
        );

    } catch (error) {
        console.error(
            "UPDATE BOOK ERROR:",
            error
        );

        return res.status(500).json({
            message:
                "Server error while updating book",
            error: error.message,
        });
    }
};


const deleteBook = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                message:
                    "Authentication required",
            });
        }

        const book = await Book.findById(
            req.params.id
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        if (!book.userId) {
            return res.status(400).json({
                message:
                    "This book does not have a userId",
            });
        }

        if (
            book.userId.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Not authorized",
            });
        }

        deleteLocalCover(
            book.coverImage
        );
        await Book.findByIdAndDelete(
            req.params.id
        );

        console.log("==============================");
        console.log(
            "BOOK DELETED:",
            req.params.id
        );
        console.log("==============================");

        return res.status(200).json({
            message:
                "Book deleted successfully",
        });

    } catch (error) {
        console.error(
            "DELETE BOOK ERROR:",
            error
        );

        return res.status(500).json({
            message:
                "Server error while deleting book",
            error: error.message,
        });
    }
};

const updateBookCover = async (req, res) => {
    try {
        console.log("");
        console.log(
            "================================="
        );
        console.log(
            "        COVER UPLOAD REQUEST"
        );
        console.log(
            "================================="
        );

        console.log(
            "BOOK ID:",
            req.params.id
        );

        console.log(
            "USER ID:",
            req.user?._id?.toString()
        );

        console.log(
            "FILE:",
            req.file
                ? {
                    fieldname:
                        req.file.fieldname,

                    originalname:
                        req.file.originalname,

                    filename:
                        req.file.filename,

                    mimetype:
                        req.file.mimetype,

                    size:
                        req.file.size,

                    path:
                        req.file.path,
                }
                : null
        );
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                message:
                    "Authentication required",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message:
                    "Please select a cover image.",
            });
        }


        const book = await Book.findById(
            req.params.id
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found.",
            });
        }

        if (!book.userId) {
            return res.status(400).json({
                message:
                    "This book does not have a userId.",
            });
        }

        if (
            book.userId.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Not authorized.",
            });
        }

        const oldCoverImage =
            book.coverImage;

        console.log(
            "OLD COVER:",
            oldCoverImage
        );

        console.log(
            "OLD COVER TYPE:",
            typeof oldCoverImage
        );

        book.coverImage =
            `/uploads/${req.file.filename}`;

        const updatedBook =
            await book.save();

        if (
            oldCoverImage &&
            typeof oldCoverImage === "string" &&
            oldCoverImage !==
                updatedBook.coverImage
        ) {
            deleteLocalCover(
                oldCoverImage
            );
        }
        console.log(
            "NEW COVER:",
            updatedBook.coverImage
        );

        console.log(
            "COVER UPDATED SUCCESSFULLY"
        );

        console.log(
            "================================="
        );
        console.log("");

        return res.status(200).json({
            message:
                "Cover image uploaded successfully",

            book:
                updatedBook,

            coverImage:
                updatedBook.coverImage,
        });

    } catch (error) {
        console.error("");
        console.error(
            "================================="
        );
        console.error(
            "UPDATE COVER ERROR"
        );
        console.error(
            "================================="
        );
        console.error(
            error
        );
        console.error(
            "MESSAGE:",
            error.message
        );
        console.error(
            "STACK:",
            error.stack
        );
        console.error(
            "================================="
        );

        return res.status(500).json({
            message:
                "Server error while updating cover.",
            error:
                error.message,
        });
    }
};

// ======================================================
// EXPORT
// ======================================================

module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    updateBookCover,
};