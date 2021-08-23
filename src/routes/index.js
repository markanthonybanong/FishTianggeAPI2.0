const routes            = require('express').Router();
const userRoutes        = require('./user');
const myStoreRoutes     = require('./store');
const productRoutes     = require('./product');
const applicationRoutes = require('./application');
const cartRoutes        = require('./cart');
const orderRoutes       = require('./order');
const deliverRoutes     = require('./deliver');
const ratingRoutes      = require('./rating');
const reportRoutes      = require('./report');
const sukiListRoutes    = require('./suki-list');
const userMetaRoutes    = require('./user-meta');
const statusRoutes      = require('./status');
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

    routes.use(
        '/api/report',
        reportRoutes()
    );

    routes.use(
        '/api/sukiList',
        sukiListRoutes()
    );

    routes.use(
        '/api/userMeta',
        userMetaRoutes()
    );
    routes.use(
        '/api/status',
        statusRoutes()
    );
    return routes;
};