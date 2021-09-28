const productRoutes     = require('express').Router();
const productController = require('../controllers/product');

module.exports = () => {
    productRoutes.post('/addProduct', productController.addProduct);

    productRoutes.post('/getStoreProducts', productController.getStoreProducts);

    productRoutes.post('/getStoreProductsForBuyer', productController.getStoreProductsForBuyer);

    productRoutes.post('/getAllStoreProducts', productController.getAllStoreProducts);

    productRoutes.delete('/deleteProduct/:id', productController.deleteProduct);
    
    productRoutes.post('/getProduct', productController.getProduct);

    productRoutes.put('/updateProduct', productController.updateProduct);

    productRoutes.put('/updateProductStatus', productController.updateProductStatus);

    productRoutes.post('/getArchieveStoreProducts', productController.getArchieveStoreProducts);

    productRoutes.post('/getStoreSameProductsCategory', productController.getStoreSameProductsCategory);
    
    return productRoutes;
};