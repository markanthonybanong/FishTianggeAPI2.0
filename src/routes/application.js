const applicationRoutes      = require('express').Router();
const applicationController  = require('../controllers/application');

module.exports = () => {
    applicationRoutes.post('/addApplication', applicationController.addApplication);

    applicationRoutes.post('/getApplication', applicationController.getApplication);

    applicationRoutes.delete('/deleteApplication/:id', applicationController.deleteApplication);

    return applicationRoutes;
};