const userRoutes      = require('express').Router();
const userController  = require('../controllers/user');

module.exports = () => {
    userRoutes.post('/createUser', userController.createUser);
    
    userRoutes.put('/updateUser', userController.updateUser);

    userRoutes.put('/updateUserStoreId', userController.updateUserStoreId)

    userRoutes.post('/findByEmailAndPass', userController.findUserByEmailAndPass);

    userRoutes.post('/getUser', userController.getUser);

    userRoutes.post('/getCouriers', userController.getCouriers);

    userRoutes.post('/getMobileNumAndEmail', userController.getMobileNumAndEmail);

    userRoutes.post('/sendVerificationCode', userController.sendVerificationCode);
    
    return userRoutes;
};