const ratingRoutes      = require('express').Router();
const ratingController  = require('../controllers/rating');

module.exports = () => {
    ratingRoutes.post('/addRating', ratingController.addRating);
    return ratingRoutes;
};