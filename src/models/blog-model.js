const mongoose = require('mongoose');

const contentTypes = ['heading', 'sub_heading', 'text', 'image', 'code'];

const blogSchema = new mongoose.Schema({
  title: String,
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, // User ID of the author
  coverImage: String, // URL to the cover image
  content: [
    {
      type: {
        type: String,
        enum: contentTypes, // Use the enum for content types
      },
      value: String,
    },
  ],
  categories: [String], // Array of category names
  tags: [String], // Array of tags
  createdDate: Date,
  lastUpdated: Date,
  featured: Boolean, // Is the blog post featured?
  likes: Number, // Number of likes
  dislikes: Number, // Number of dislikes
  views: Number, // Number of views
  comments: [
    {
      user: String, // User ID of the commenter
      content: String,
      createdDate: Date,
      likes: Number,
      dislikes: Number,
    },
  ],
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
