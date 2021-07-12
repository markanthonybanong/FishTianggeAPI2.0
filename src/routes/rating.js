const ratingRoutes      = require('express').Router();
const ratingController  = require('../controllers/rating');

module.exports = () => {
    ratingRoutes.post('/add', ratingController.add);

    ratingRoutes.post('/selectByUserAndOrderId', ratingController.selectByUserAndOrderId);

    ratingRoutes.post('/selectByStoreId', ratingController.selectByStoreId);

    ratingRoutes.post('/selectById', ratingController.selectById);

    ratingRoutes.put('/update', ratingController.update);

    ratingRoutes.delete('/delete/:id', ratingController.delete);
    
    return ratingRoutes;
};