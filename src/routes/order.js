const orderRoutes     = require('express').Router();
const orderController = require('../controllers/order');

module.exports = () => {
    orderRoutes.post('/addOrder', orderController.addOrder);

    orderRoutes.post('/getStoreNoneOrders', orderController.getStoreNoneOrders);

    orderRoutes.post('/getStorePendingOrders', orderController.getStorePendingOrders);

    orderRoutes.post('/getStoreAcceptOrders', orderController.getStoreAcceptOrders);

    orderRoutes.post('/getStoreDeclineOrders', orderController.getStoreDeclineOrders);

    orderRoutes.post('/getStoreOnTheWayOrders', orderController.getStoreOnTheWayOrders);

    orderRoutes.post('/getStoreDeliverOrders', orderController.getStoreDeliverOrders);

    orderRoutes.post('/getStoreAllOrders', orderController.getStoreAllOrders);

    orderRoutes.post('/getStoreDeliveredOrders', orderController.getStoreDeliveredOrders);
    
    orderRoutes.post('/getOrder', orderController.getOrder);

    orderRoutes.post('/getPendingOrdersByUserId', orderController.getPendingOrdersByUserId);
    
    orderRoutes.post('/getDeliveredOrdersByUserId', orderController.getDeliveredOrdersByUserId);
    
    orderRoutes.put('/updateOrderStatus', orderController.updateOrderStatus);

    orderRoutes.put('/updateOrderSellerStatus', orderController.updateOrderSellerStatus);
 
    orderRoutes.delete('/deleteOrder/:id', orderController.deleteOrder);
    
    // orderRoutes.post('/getProduct', orderController.getProduct); 
    return orderRoutes;
};