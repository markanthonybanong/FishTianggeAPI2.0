const httpStatusCode = require('http-status-codes');
const Report         = require('../models/report');   
exports.add = async(req, res) => {
    const report = new Report({
        storeId: req.body.storeId,
        orderId: req.body.orderId,
        deliverId: req.body.deliverId,
        userComment: req.body.userComment,
        dateReported: req.body.dateReported,
        userId: req.body.userId,
    });
    Report.add(report, (err, rating) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(rating);
        }
    });
};
exports.selectByUserAndOrderId = async(req, res) => {
    Report.selectByUserAndOrderId(req.body, (err, user)=> {
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
