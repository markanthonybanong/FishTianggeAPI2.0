const httpStatusCode = require('http-status-codes');
const Deliver        = require('../models/Deliver'); 

exports.addToDeliver = async(req, res) => {
    const deliver = new Deliver({
        orderId: req.body.orderId,
        storeId: req.body.storeId,
        courierId: req.body.courierId,
        courierName: req.body.courierName,
        courierPhoneNum: req.body.courierPhoneNum,
        productImg: req.body.productImg,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        subtotal: req.body.subtotal,
        deliveryStatus: req.body.deliveryStatus,
        customerName: req.body.customerName,
        customerMobileNum: req.body.customerMobileNum,
        shippingAddress: req.body.shippingAddress,
        shippingAddressLat: req.body.shippingAddressLat,
        shippingAddressLng: req.body.shippingAddressLng,
        orderDate: req.body.orderDate
    });
    
    Deliver.add(deliver, (err, deliver) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(deliver);
        }
    });
};
exports.updateToDeliver = async(req, res) => {
    const deliver  = new Deliver({
        courierId: req.body.courierId,
        courierName: req.body.courierName,
        courierPhoneNum: req.body.courierPhoneNum,
        deliveryStatus: req.body.deliveryStatus,
    });
    Deliver.update(req.body.id, deliver, (err, product) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(product);
        }
    });
};
exports.deleteToDeliver = async(req, res) =>{
    Deliver.deleteToDeliver(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(httpStatusCode.NOT_FOUND).send({
                message: `Not found order with id ${req.params.id}.`
              });
            } else {
              res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
                message: "Could not delete order with id " + req.params.id
              });
            }
          } else res.status(httpStatusCode.OK).send({ message: `Order was deleted successfully!` });
    });
}
exports.updateToDeliverStatus = async(req, res) => {
    Deliver.updateToDeliverStatus(req.body.id, req.body.status, (err, deliver) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(deliver);
        }
    });
};
exports.updateCourierStatus = async(req, res) => {
    deliver = new Deliver({
        courLat: req.body.courLat,
        courLng: req.body.courLng,
        watchId: req.body.watchId,
        intervalId: req.body.intervalId
    });
    Deliver.updateCourierStatus(req.body.id, deliver, (err, deliver) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(deliver);
        }
    });
};
exports.getToDeliver = async(req, res) => { //returns null when not found
    Deliver.getToDeliver(req.body.orderId, (err, deliver)=> {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({
                message: err
            });
        } else {
            res.status(httpStatusCode.OK).json(deliver);
        }
    });
};
exports.getCourierPendingDeliveries = async(req, res) => {
    Deliver.getCourierPendingDeliveries(req.body.courierId, (err, deliveries)=> {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({
                message: err
            });
        } else {
            res.status(httpStatusCode.OK).json(deliveries);
        }
    });
};
exports.getCourierDeliveredDeliveries = async(req, res) => {
    Deliver.getCourierDeliveredDeliveries(req.body.courierId, (err, deliveries)=> {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({
                message: err
            });
        } else {
            res.status(httpStatusCode.OK).json(deliveries);
        }
    });
};
exports.getCourierToDeliverProduct = async(req, res) => {
    Deliver.getCourierToDeliverProduct(req.body.deliverId, (err, deliver)=> {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({
                message: err
            });
        } else {
            res.status(httpStatusCode.OK).json(deliver);
        }
    });
};
exports.getDeliverByCourIdAndStatus = async(req, res) => {
    Deliver.getDeliverByCourIdAndStatus(req.body, (err, deliver)=> {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({
                message: err
            });
        } else {
            res.status(httpStatusCode.OK).json(deliver);
        }
    });
};