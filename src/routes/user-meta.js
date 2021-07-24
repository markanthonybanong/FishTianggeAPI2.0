const userMetaRoutes     = require('express').Router();
const userMetaController = require('../controllers/user-meta');

module.exports = () => {
    userMetaRoutes.post('/add', userMetaController.add);

    userMetaRoutes.post('/selectById', userMetaController.selectById);

    userMetaRoutes.post('/selectByUserIdAndMetaKey', userMetaController.selectByUserIdAndMetaKey);

    userMetaRoutes.put('/update', userMetaController.update);

    userMetaRoutes.delete('/delete/:id', userMetaController.delete);
    
    return userMetaRoutes;
};