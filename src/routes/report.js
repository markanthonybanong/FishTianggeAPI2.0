const reportRoutes      = require('express').Router();
const reportController  = require('../controllers/report');

module.exports = () => {
    reportRoutes.post('/add', reportController.add);
    reportRoutes.post('/selectReportByUserAndOrderId', reportController.selectByUserAndOrderId);
    
    return reportRoutes;
};