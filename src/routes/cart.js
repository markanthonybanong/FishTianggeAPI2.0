const cartRoutes     = require('express').Router();
const cartController = require('../controllers/cart');

module.exports = () => {
    
    cartRoutes.post('/add', cartController.add);

    cartRoutes.post('/getUserCartItems', cartController.getUserCartItems);

    cartRoutes.put('/updateQuantity', cartController.updateQuantity);

    cartRoutes.delete('/removeCartItem/:id', cartController.removeCartItem);

    cartRoutes.delete('/removeCartItems/:userId', cartController.removeCartItems);
    
    return cartRoutes;
};