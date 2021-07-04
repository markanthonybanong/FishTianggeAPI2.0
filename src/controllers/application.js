const httpStatusCode = require('http-status-codes');
const Application    = require('../models/application');   

exports.addApplication = async(req, res) => {
    const application  = new Application({
        fullName: req.body.fullName,
        userId: req.body.userId,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        status: req.body.status,
        img: req.body.img,
        type: req.body.type
    });
    Application.addApplication(application, (err, application) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(application);
        }
    });
};

exports.getApplication = async(req, res) => {
    Application.getApplicationByUserId(req.body.userId, (err, store)=> {
        if(err) {
            if (err.kind === "not_found"){
                res.status(httpStatusCode.NOT_FOUND).send({
                    message: 'Not found application'
                });
            } else {
                res.status(httpStatusCode.BAD_REQUEST).send({
                    message: err
                });
            }
        } else {
            res.status(httpStatusCode.OK).json(store);
        }
    });
};

exports.deleteApplication = async(req, res) => {
    Application.deleteApplication(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(httpStatusCode.NOT_FOUND).send({
                message: `Not found application with id ${req.params.id}.`
              });
            } else {
              res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
                message: "Could not delete application with id " + req.params.id
              });
            }
          } else res.status(httpStatusCode.OK).send({ message: `Application was deleted successfully!` });
    });
}