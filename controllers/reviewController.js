const Review = require('../models/Review');
const Book = require('../models/Book');

exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { id: bookId } = req.params;

  const existing = await Review.findOne({ user: req.user.id, book: bookId });
  if (existing) return res.status(400).json({ message: 'You already reviewed this book.' });

  const review = new Review({ user: req.user.id, book: bookId, rating, comment });
  await review.save();

  await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });
  res.status(201).json(review);
};

exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return res.status(404).json({ message: 'Review not found' });
  }

  if (!review.user || review.user.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  review.rating = req.body.rating;
  review.comment = req.body.comment;
  await review.save();
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return res.status(404).json({ message: 'Review not found' });
  }

  if (!review.user || review.user.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  await Review.findByIdAndDelete(req.params.id);
  await Book.findByIdAndUpdate(review.book, { $pull: { reviews: review._id } });
  res.json({ message: 'Review deleted' });
};