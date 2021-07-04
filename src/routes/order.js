const orderRoutes     = require('express').Router();
const orderController = require('../controllers/order');

module.exports = () => {
    orderRoutes.post('/addOrder', orderController.addOrder);

    orderRoutes.post('/getStorePendingOrders', orderController.getStorePendingOrders);

    orderRoutes.post('/getStoreDeliveredOrders', orderController.getStoreDeliveredOrders);
    
    orderRoutes.post('/getOrder', orderController.getOrder);

    orderRoutes.post('/getPendingOrdersByUserId', orderController.getPendingOrdersByUserId);
    
    orderRoutes.post('/getDeliveredOrdersByUserId', orderController.getDeliveredOrdersByUserId);
    
    orderRoutes.put('/updateOrderStatus', orderController.updateOrderStatus);
 
    orderRoutes.delete('/deleteOrder/:id', orderController.deleteOrder);
    
    // orderRoutes.post('/getProduct', orderController.getProduct); 
    return orderRoutes;
};