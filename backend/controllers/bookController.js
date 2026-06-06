const Book=require("../models/Book");

// @desc Create a new book
// @route post/api/books
// @access Private
const createBook=async(req,res) => {
    try{
        const{title,author,subtitle,chapter}=req.body;

        if(!title || !author) {
            return res.status(400).json({message:"please provide a title and author"});
        }

        const book=await Book.create({
            userId: req.user._id,
            title,
            author,
            subtitle,
            chapters,
        });

        res.status(201).json(book);
    } catch(error){
        res.status(500).json({ message:"Server error"});
    }
};

// @desc Get all Books for a user
// @desc get/api/books
// @access Private
const getBooks=async(req,res)=>{
    try{
        const books=(await Book.find({userId: req.user._id })).toSorted({createdAt:-1});
        res.status(200).json(books);
    } catch(error) {
        res.status(500).json({message:"Server Error"});
    }

};

// @desc get a single book by ID
// @route get/api/books/:id
// @access private
const getBookById=async(req,res) => {
    try{
        const book=await Book.findById(req.params.id);

        if (!book){
            return res.status(404).json({message:"Book not found"});
        }

        if(book.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({message:"Not authorized to view this book"});
        }

        res.status(200).json({book});

    } catch(error) {
        res.status(500).json({message:"Server Error"});
    }

};
// @desc Update a book
// @route put/api/books/:id
// @access private
const updateBook=async (req,res) => {
    try{
        const book=await Book.findById(req.params.id);

        if(!book) {
            return res.status(404).json({message:"Book not found"});
        }

        if(book.userId.toString() !== req.user._id.toString()){
            return res.status(401).json({ message: "Not authorized to update this book"});
        }

        if(req.file) {
            book.coverImage=`/${req.file.path}`;
        } else{
            return res.status(400).json({message:"no image file provided"});
        }
        const updateBook=await book.save();
        res.status(200).json(updateBook);
    } catch(error) {
    res.status(500).json({message:"Server error"});
}
};
// @desc update a book's cover image 
// @route put /api/books/cover/:id
// @access private
const updateBookCover=async(req,res)=> {

};


const deleteBook=async(req,res)=> {

};


module.exports={
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    updateBookCover,
};

