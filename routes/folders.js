'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Folder = require('../models/folder');
<<<<<<< HEAD
=======
const Note = require('../models/note');
>>>>>>> 39cd68d3bf57625c7881c545c0065424d44a292e

const router = express.Router();

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {

  Folder.find()
<<<<<<< HEAD
    .sort({ name: 'asc' })
=======
    .sort('name')
>>>>>>> 39cd68d3bf57625c7881c545c0065424d44a292e
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Folder.findById(id)
    .then(result => {
      if (result) {
<<<<<<< HEAD
        res.json(result)
          .status(200);
=======
        res.json(result);
>>>>>>> 39cd68d3bf57625c7881c545c0065424d44a292e
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

<<<<<<< HEAD

=======
>>>>>>> 39cd68d3bf57625c7881c545c0065424d44a292e
/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  const { name } = req.body;

<<<<<<< HEAD
=======
  const newFolder = { name };

>>>>>>> 39cd68d3bf57625c7881c545c0065424d44a292e
  /***** Never trust users - validate input *****/
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

<<<<<<< HEAD
  const newFolder = { name };

  Folder.create(newFolder)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
=======
  Folder.create(newFolder)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('Folder name already exists');
        err.status = 400;
      }
>>>>>>> 39cd68d3bf57625c7881c545c0065424d44a292e
      next(err);
    });
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

<<<<<<< HEAD
  //duplicate key error 11000
  for (let i = 0; i < req.length; i++) {
    if (name === req[i].name) {
      const err = new Error('Cannot add because name already exists.  Cannot have duplicate names');
      err.status = 11000;
      return next(err);
    }
  }

=======
>>>>>>> 39cd68d3bf57625c7881c545c0065424d44a292e
  const updateFolder = { name };

  Folder.findByIdAndUpdate(id, updateFolder, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      if (err.code === 11000) {
<<<<<<< HEAD
        err = new Error('Cannot add because name already exists.  Cannot have duplicate names');
=======
        err = new Error('Folder name already exists');
>>>>>>> 39cd68d3bf57625c7881c545c0065424d44a292e
        err.status = 400;
      }
      next(err);
    });
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

<<<<<<< HEAD
  Folder.findByIdAndRemove(id)
=======
  // ON DELETE SET NULL equivalent
  const folderRemovePromise = Folder.findByIdAndRemove( id );
  // ON DELETE CASCADE equivalent
  // const noteRemovePromise = Note.deleteMany({ folderId: id });

  const noteRemovePromise = Note.updateMany(
    { folderId: id },
    { $unset: { folderId: '' } }
  );

  Promise.all([folderRemovePromise, noteRemovePromise])
>>>>>>> 39cd68d3bf57625c7881c545c0065424d44a292e
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      next(err);
    });
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 39cd68d3bf57625c7881c545c0065424d44a292e
