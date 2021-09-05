const storeRoutes      = require('express').Router();
const storeController  = require('../controllers/store');

module.exports = () => {
    storeRoutes.post('/getStore', storeController.getStore);

    storeRoutes.post('/getStoreById', storeController.getStoreById);

    storeRoutes.post('/getStores', storeController.getStores)

    storeRoutes.post('/addStore', storeController.addStore);
    
    storeRoutes.put('/updateStore', storeController.updateStore);

    return storeRoutes;
};