const statusRoutes      = require('express').Router();
const statusController  = require('../controllers/status');

module.exports = () => {
    statusRoutes.get('/get', statusController.get);
    return statusRoutes;
};