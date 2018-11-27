'use strict';

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  // createdAt: Date,
  // updatedAt: Date
});

noteSchema.set('timestamps', true);

module.exports = mongoose.model('Note', noteSchema);