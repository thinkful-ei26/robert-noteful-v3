'use strict';
/**
 * Run using:
 * `node scratch/mongoose-queries.js`
 * or
 * `nodemon scratch/mongoose-queries.js`
 */

const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');
const Note = require('../models/note');

const Folder = require('../models/folder');

// mongoose.connect(MONGODB_URI, { useNewUrlParser:true })
//   .then(() => {
//     const searchTerm = 'lady gaga';
//     let filter = {};

//     if (searchTerm) {
//       filter.title = { $regex: searchTerm, $options: 'i' }, 
//       filter.content = { $regex: searchTerm, $options: 'i'};
//     }

//     return Note.find({$or: [
//       { title: filter.title },
//       { content: filter.content}
//     ]}).sort({ updatedAt: 'desc' });
//   })
//   .then(results => {
//     console.log(results);
//   })
//   .then(() => {
//     return mongoose.disconnect();
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });

// mongoose.connect(MONGODB_URI, { useNewUrlParser:true })
//   .then(() => {
//     const id = '000000000000000000000001';

//     return Note.findById(id);
//   })
//   .then(results => {
//     console.log(results);
//   })
//   .then(() => {
//     return mongoose.disconnect();
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });

// mongoose.connect(MONGODB_URI, { useNewUrlParser:true })
//   .then(() => {
//     // const { title, content } = req.body;
//     let id = '001';

//     const newItem = {
//       title: 'New Title',
//       content: 'New content'
//     }

//     if (!newItem.title) {
//       const err = new Error('Missing title in request body');
//       err.status = 400;
//       return next(err);
//     }

//     return Note.create(newItem);
//   })
//   .then(results => {
//     console.log(results);
//   })
//   .then(() => {
//     return mongoose.disconnect();
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });

// mongoose.connect(MONGODB_URI, { useNewUrlParser:true })
//   .then(() => {
//     const id = '000000000000000000000001';
//     const newObject = {
//       title: 'Updated title',
//       content: 'Updated content'
//     };

//     return Note.findByIdAndUpdate(id, {newObject});
//   })
//   .then(results => {
//     console.log(results);
//   })
//   .then(() => {
//     return mongoose.disconnect();
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });

// mongoose.connect(MONGODB_URI, { useNewUrlParser:true })
//   .then(() => {
//     const id = '000000000000000000000001';

//     return Note.findByIdAndRemove(id);
//   })
//   .then(results => {
//     console.log(results);
//   })
//   .then(() => {
//     return mongoose.disconnect();
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });


mongoose.connect(MONGODB_URI, { useNewUrlParser:true })
  .then(() => {
    const searchTerm = 'lady gaga';
    let filter = {};

    if (searchTerm) {
      filter.title = { $regex: searchTerm, $options: 'i' }, 
      filter.content = { $regex: searchTerm, $options: 'i'};
    }

    return Note.find({$or: [
      { title: filter.title },
      { content: filter.content}
    ]}).sort({ updatedAt: 'desc' });
  })
  .then(results => {
    console.log(results);
/**
 * Find/Search for notes using Note.find
 */

const searchTerm = 'Lady Gaga';
let filter = {};

if (searchTerm) {
  // Using the `$regex` operator with case-insensitive `i` option
  filter.title = { $regex: searchTerm, $options: 'i' };
}

Note.find(filter).sort({ updatedAt: 'desc' })
  .then(results => {
    console.log(results);
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });

/**
 * Find note by id using Note.findById
 */

Note.findById('111111111111111111111103')
  .then(result => {
    if (result) {
      console.log(result);
    } else {
      console.log('not found');
    }
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });

/**
 * Create a new note using Note.create
 */

const newNote = {
  title: 'this is a new note',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
};

Note.create(newNote)
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });

/**
 * Update a note by id using Note.findByIdAndUpdate
 */

const updateNote = {
  title: 'updated title',
  content: 'Posuere sollicitudin aliquam ultrices sagittis orci a. Feugiat sed lectus vestibulum mattis.'
};

Note.findByIdAndUpdate('111111111111111111111103', updateNote, { new: true })
  .then(result => {
    if (result) {
      console.log(result);
    } else {
      console.log('not found');
    }
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });

/**
 * Delete a note by id using Note.findByIdAndRemove
 */

Note.findByIdAndRemove('111111111111111111111104')
  .then(result => {
    console.log('deleted', result);
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });

/************************************************************
 ** FOR DEVELOPMENT ONLY - DO NOT USE IN EXPRESS ENDPOINTS **
 ************************************************************
 *
 * Connect to mongoose, which allows the queries above to execute
 * Then setTimeout() to disconnect mongoose after 1000 milliseconds
 *
 */

mongoose.connect(MONGODB_URI, { useNewUrlParser:true });
setTimeout(() => mongoose.disconnect(), 1000);

//************************************************************