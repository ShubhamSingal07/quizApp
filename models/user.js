const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, index: true },
  answers: [Number],
  score: Number,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
