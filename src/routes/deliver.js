const deliverRoutes     = require('express').Router();
const deliverController = require('../controllers/deliver');

module.exports = () => {
    deliverRoutes.post('/addToDeliver', deliverController.addToDeliver);

    deliverRoutes.put('/updateToDeliver', deliverController.updateToDeliver);

    deliverRoutes.put('/updateToDeliverStatus', deliverController.updateToDeliverStatus);

    deliverRoutes.put('/updateCourierStatus', deliverController.updateCourierStatus);
    
    deliverRoutes.post('/getToDeliver', deliverController.getToDeliver);

    deliverRoutes.post('/getCourierPendingDeliveries', deliverController.getCourierPendingDeliveries);
    
    deliverRoutes.post('/getCourierDeliveredDeliveries', deliverController.getCourierDeliveredDeliveries);
    
    deliverRoutes.post('/getCourierToDeliverProduct', deliverController.getCourierToDeliverProduct);

    // productRoutes.delete('/deleteProduct/:id', productController.deleteProduct);
    
    // productRoutes.post('/getProduct', productController.getProduct);

    
    
    return deliverRoutes;
};