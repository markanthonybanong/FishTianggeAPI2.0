const routes            = require('express').Router();
const userRoutes        = require('./user');
const myStoreRoutes     = require('./store');
const productRoutes     = require('./product');
const applicationRoutes = require('./application');
const cartRoutes        = require('./cart');
const orderRoutes       = require('./order');
const deliverRoutes     = require('./deliver');
const ratingRoutes      = require('./rating');

module.exports = () => {
    routes.use(
        '/api/user',
        userRoutes()
    );
    
    routes.use(
        '/api/store',
        myStoreRoutes()  
    );

    routes.use(
        '/api/product',
        productRoutes()  
    );

    routes.use(
        '/api/application',
        applicationRoutes()  
    );

    routes.use(
        '/api/cart',
        cartRoutes()  
    );

    routes.use(
        '/api/order',
        orderRoutes()  
    );

    routes.use(
        '/api/deliver',
        deliverRoutes()  
    );

    routes.use(
        '/api/rating',
        ratingRoutes()
    );

    return routes;
};