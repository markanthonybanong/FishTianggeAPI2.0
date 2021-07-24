const sukiListRoutes     = require('express').Router();
const sukiListController = require('../controllers/suki-list');

module.exports = () => {
    sukiListRoutes.post('/add', sukiListController.add);
    
    sukiListRoutes.post('/selectByUserAndStoreId', sukiListController.selectByUserAndStoreId);

    sukiListRoutes.post('/selectByUserId', sukiListController.selectByUserId);

    sukiListRoutes.delete('/delete/:id', sukiListController.delete);
    
    return sukiListRoutes;
};