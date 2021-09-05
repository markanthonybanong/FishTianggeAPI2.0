const httpStatusCode = require('http-status-codes');
const Store          = require('../models/store');   

exports.getStore = async(req, res) => {
    Store.getStoreByUserId(req.body.id, (err, store)=> {
        if(err) {
            if (err.kind === "not_found"){
                res.status(httpStatusCode.NOT_FOUND).send({
                    message: `Not found store with user id ${req.body.userId}`
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
exports.getStoreById = async(req, res) => {
    Store.getStoreById(req.body.id, (err, store)=> {
        if(err) {
            if (err.kind === "not_found"){
                res.status(httpStatusCode.NOT_FOUND).send({
                    message: `Not found store with id ${req.body.userId}`
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
exports.getStores = async(req, res) => {
    Store.getStores((err, store)=> {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({
                message: err
            });
        } else {
            res.status(httpStatusCode.OK).json(store);
        }
    });
};

exports.addStore = async(req, res) => {
    const store  = new Store({
        userId: req.body.userId,
        img: req.body.img,
        name: req.body.name,
        information: req.body.information,
        location: req.body.location,
        contactNumber: req.body.contactNumber
    });
    Store.add(store, (err, store) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(store);
        }
    });
};

exports.updateStore = async(req, res) => {
    const store  = new Store({
        img: req.body.img,
        name: req.body.name,
        information: req.body.information,
        location: req.body.location,
        contactNumber: req.body.contactNumber
    });
    Store.update(req.body.id, store, (err, store) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(store);
        }
    });
};