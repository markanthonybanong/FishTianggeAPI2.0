const httpStatusCode = require('http-status-codes');
const SukiList       = require('../models/suki-list');   
exports.add = async(req, res) => {
    const sukiList = new SukiList({
        userId: req.body.userId,
        storeId: req.body.storeId
    });
    SukiList.add(sukiList, (err, result) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(result);
        }
    });
};
exports.selectByUserAndStoreId = async(req, res) => {
    SukiList.selectByUserAndStoreId(req.body, (err, result)=> {
        if(err) {
            if (err.kind === "not_found"){
                res.status(httpStatusCode.OK).json();
            } else {
                res.status(httpStatusCode.BAD_REQUEST).send({
                    message: err
                });
            }
        } else {
            res.status(httpStatusCode.OK).json(result);
        }
    });
};
exports.selectByUserId = async(req, res) => {
    SukiList.selectByUserId(req.body.id, (err, results)=> {
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
exports.delete = async(req, res) =>{
    SukiList.delete(req.params.id, (err, data) => {
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
