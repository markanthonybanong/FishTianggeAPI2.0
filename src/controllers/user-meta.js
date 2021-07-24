const httpStatusCode = require('http-status-codes');
const UserMeta       = require('../models/user-meta');   
exports.add = async(req, res) => {
    const userMeta = new UserMeta({
        userId: req.body.userId,
        metaKey: req.body.metaKey,
        metaValue: req.body.metaValue
    });
    UserMeta.add(userMeta, (err, result) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(result);
        }
    });
};
exports.selectById = async(req, res) => {
    UserMeta.selectById(req.body.id, (err, results)=> {
        if(err) {
            if (err.kind === "not_found"){
                res.status(httpStatusCode.OK).json();
            } else {
                res.status(httpStatusCode.BAD_REQUEST).send({
                    message: err
                });
            }
        } else {
            res.status(httpStatusCode.OK).json(results);
        }
    });
};
exports.selectByUserIdAndMetaKey = async(req, res) => {
    UserMeta.selectByUserIdAndMetaKey(req.body, (err, results)=> {
        if(err) {
            if (err.kind === "not_found"){
                res.status(httpStatusCode.OK).json();
            } else {
                res.status(httpStatusCode.BAD_REQUEST).send({
                    message: err
                });
            }
        } else {
            res.status(httpStatusCode.OK).json(results);
        }
    });
};
exports.update = async(req, res) => {
    const userMeta  = new UserMeta({
        metaKey: req.body.metaKey,
        metaValue: req.body.metaValue
    });
    UserMeta.update(req.body.id, userMeta, (err, updateUserMeta) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(updateUserMeta);
        }
    });
};
exports.delete = async(req, res) =>{
    UserMeta.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(httpStatusCode.NOT_FOUND).send({
                message: `Not found suki list with id ${req.params.id}.`
              });
            } else {
              res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
                message: "Could not delete suki list with id " + req.params.id
              });
            }
          } else res.status(httpStatusCode.OK).send({ message: `Suki list was deleted successfully!` });
    });
}
