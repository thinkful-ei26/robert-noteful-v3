'use strict';

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String
});

// Add `createdAt` and `updatedAt` fields
noteSchema.set('timestamps', true);

// Customize output for `res.json(data)`, `console.log(data)` etc.
noteSchema.set('toJSON', {
  virtuals: true,     // include built-in virtual `id`
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Note', noteSchema);
