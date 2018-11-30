'use strict';

const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: { type: String,
    required: true,
    unique: true }
});

folderSchema.set('timestamps', true);

folderSchema.set('toJSON', {
  virtuals: true,
=======
  name: { type: String, required: true, unique: true }
});

// Add `createdAt` and `updatedAt` fields
folderSchema.set('timestamps', true);

// Customize output for `res.json(data)`, `console.log(data)` etc.
folderSchema.set('toJSON', {
  virtuals: true,     // include built-in virtual `id`
>>>>>>> 39cd68d3bf57625c7881c545c0065424d44a292e
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

<<<<<<< HEAD
module.exports = mongoose.model('Folder', folderSchema);
=======
module.exports = mongoose.model('Folder', folderSchema);
>>>>>>> 39cd68d3bf57625c7881c545c0065424d44a292e
