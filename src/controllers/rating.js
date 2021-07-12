const httpStatusCode = require('http-status-codes');
const Rating         = require('../models/rating');   
 
exports.add = async(req, res) => {
    const rating = new Rating({
        storeId: req.body.storeId,
        orderId: req.body.orderId,
        starNumber: req.body.starNumber,
        userComment: req.body.userComment,
        dateRate: req.body.dateRate,
        userId: req.body.userId,
    });
    Rating.add(rating, (err, rating) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(rating);
        }
    });
};
exports.selectByUserAndOrderId = async(req, res) => {
    Rating.selectByUserAndOrderId(req.body, (err, user)=> {
        if(err) {
            if (err.kind === "not_found"){
                res.status(httpStatusCode.OK).json();
            } else {
                res.status(httpStatusCode.BAD_REQUEST).send({
                    message: err
                });
            }
        } else {
            res.status(httpStatusCode.OK).json(user);
        }
    });
};

exports.selectByStoreId = async(req, res) => {
    Rating.selectByStoreId(req.body.storeId, (err, user)=> {
        if(err) {
            if (err.kind === "not_found"){
                res.status(httpStatusCode.OK).json();
            } else {
                res.status(httpStatusCode.BAD_REQUEST).send({
                    message: err
                });
            }
        } else {
            res.status(httpStatusCode.OK).json(user);
        }
    });
}; 

exports.selectById = async(req, res) => {
    Rating.selectById(req.body.id, (err, user)=> {
        if(err) {
            if (err.kind === "not_found"){
                res.status(httpStatusCode.OK).json();
            } else {
                res.status(httpStatusCode.BAD_REQUEST).send({
                    message: err
                });
            }
        } else {
            res.status(httpStatusCode.OK).json(user);
        }
    });
};
exports.update = async(req, res) => {
    const rating  = new Rating({
        dateRate: req.body.dateRate,
        starNumber: req.body.starNumber,
        userComment: req.body.userComment
    });
    Rating.update(req.body.id, rating, (err, updateRating) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(updateRating);
        }
    });
};
exports.delete = async(req, res) =>{
    Rating.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(httpStatusCode.NOT_FOUND).send({
                message: `Not found rating with id ${req.params.id}.`
              });
            } else {
              res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
                message: "Could not delete rating with id " + req.params.id
              });
            }
          } else res.status(httpStatusCode.OK).send({ message: `Rating was deleted successfully!` });
    });
}

 