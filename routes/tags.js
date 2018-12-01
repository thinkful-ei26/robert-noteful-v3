'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Note = require('../models/note');
const Tag = require('../models/tags');

const router = express.Router();

router.get('/', (req, res, next) => {
  Tag.find()
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The \'id\' is not valid');
    err.status = 400;
    return next(err);
  }

  Tag.findById(id)
    .then(result => {
      if(result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

router.post('/tags', (req, res, next) => {
  const { name } = req.body;
  const newTag = { name };

  if(!name) {
    const err = new Error ('missing name in request body');
    err.status = 400;
    return next(err);
  }
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The id is not valid');
    err.status = 400;
    return next(err);
  }

  if (!name) {
    const err = new Error('Missing name in request body');
    err.status = 400;
    return next(err);
  }

  for (let i = 0; i < req.length; i++) {
    if (name === req[i].name) {
      const err = new Error('Cannot add because name already exists.  Cannot have duplicate names');
      err.status = 11000;
      return next(err);
    }
  }

  const updateTag = { name };

  Tag.findByIdAndUpdate(id, updateTag, { new: true})
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('Folder name already exists');
        err.status = 400;
      }
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The id is not valid');
    err.status = 400;
    return next(err);
  }

  Tag.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      next(err);
    });

  const tagRemovePromise = Tag.findByIdAndRemove(id);
  const noteRemovePromise = Note.updateMany(
    { tags: id },
    { $pull: { tags: id } }
  );

  Promise.all([tagRemovePromise, noteRemovePromise])
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;