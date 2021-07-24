const deliverRoutes     = require('express').Router();
const deliverController = require('../controllers/deliver');

module.exports = () => {
    deliverRoutes.post('/addToDeliver', deliverController.addToDeliver);

    deliverRoutes.put('/updateToDeliver', deliverController.updateToDeliver);

    deliverRoutes.delete('/deleteToDeliver/:id', deliverController.deleteToDeliver);

    deliverRoutes.put('/updateToDeliverStatus', deliverController.updateToDeliverStatus);

    deliverRoutes.put('/updateCourierStatus', deliverController.updateCourierStatus);
    
    deliverRoutes.post('/getToDeliver', deliverController.getToDeliver);

    deliverRoutes.post('/getCourierPendingDeliveries', deliverController.getCourierPendingDeliveries);
    
    deliverRoutes.post('/getCourierDeliveredDeliveries', deliverController.getCourierDeliveredDeliveries);
    
    deliverRoutes.post('/getCourierToDeliverProduct', deliverController.getCourierToDeliverProduct);

    deliverRoutes.post('/getDeliverByCourIdAndStatus', deliverController.getDeliverByCourIdAndStatus);

    
    // productRoutes.delete('/deleteProduct/:id', productController.deleteProduct);
    
    // productRoutes.post('/getProduct', productController.getProduct);

    
    
    return deliverRoutes;
};