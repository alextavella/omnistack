const express = require('express');

const routes = new express.Router();

const multer = require('multer');
const uploadConfig = require('./config/upload');

const upload = multer(uploadConfig);

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

routes.get('/', (req, res) => res.status(200).send(`Hello ${req.query.name}!`));

routes
  .route('/posts')
  .get(PostController.index)
  .post(upload.single('image'), PostController.store);

routes
  .route('/posts/:id/like')
  .post(LikeController.store);

module.exports = routes;
