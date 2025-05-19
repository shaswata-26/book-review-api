const Book = require('../models/Book');
const Review = require('../models/Review');

exports.addBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

exports.getBooks = async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, 'i');
  if (genre) filter.genre = genre;

  const books = await Book.find(filter).skip((page - 1) * limit).limit(Number(limit));
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate({
    path: 'reviews',
    populate: { path: 'user', select: 'username' }
  }) .populate('reviews');;

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  // Ensure reviews are fully populated (not just ObjectIds)
  const avgRating =
    book.reviews && Array.isArray(book.reviews)
      ? book.reviews.reduce((sum, review) => {
          // Check if review has rating
          const rating = typeof review.rating === 'number' ? review.rating : 0;
          return sum + rating;
        }, 0) / book.reviews.length
      : 0;

  res.json({ ...book.toObject(), avgRating });
};


exports.searchBooks = async (req, res) => {
  const { query } = req.query;
  const books = await Book.find({
    $or: [
      { title: new RegExp(query, 'i') },
      { author: new RegExp(query, 'i') }
    ]
  });
  res.json(books);
};
