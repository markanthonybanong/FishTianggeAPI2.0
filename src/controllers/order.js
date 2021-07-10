const httpStatusCode = require('http-status-codes');
const Order        = require('../models/Order'); 

exports.addOrder = async(req, res) => {
    const order = new Order({
        storeId: req.body.store_id,
        userId: req.body.user_id,
        img: req.body.img,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        customerName: req.body.customer_name,
        orderStatus: req.body.status,
        orderSellerStatus: req.body.seller_status,
        orderDate: req.body.order_date,
        customerMobileNum: req.body.customer_mobile_num,
        customerAddress: req.body.customer_address,
        orderNote: req.body.order_note
    });
    
    Order.add(order, (err, order) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(order);
        }
    });
};

exports.getStorePendingOrders = async(req, res) => {
    Order.getStorePendingOrders(req.body.storeId, (err, orders)=> {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({
                message: err
            });
        } else {
            res.status(httpStatusCode.OK).json(orders);
        }
    });
};
exports.getStoreDeliveredOrders = async(req, res) => {
    Order.getStoreDeliveredOrders(req.body.storeId, (err, orders)=> {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({
                message: err
            });
        } else {
            res.status(httpStatusCode.OK).json(orders);
        }
    });
};

exports.getOrder = async(req, res) => {
    Order.getOrder(req.body.orderId, (err, product)=> {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({
                message: err
            });
        } else {
            res.status(httpStatusCode.OK).json(product);
        }
    });
};
exports.getPendingOrdersByUserId = async(req, res) => {
    Order.getPendingOrdersByUserId(req.body.userId, (err, product)=> {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({
                message: err
            });
        } else {
            res.status(httpStatusCode.OK).json(product);
        }
    });
};
exports.getDeliveredOrdersByUserId = async(req, res) => {
    Order.getDeliveredOrdersByUserId(req.body.userId, (err, product)=> {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({
                message: err
            });
        } else {
            res.status(httpStatusCode.OK).json(product);
        }
    });
};
exports.updateOrderStatus = async(req, res) => {
    Order.updateOrderStatus(req.body.id, req.body.orderStatus, (err, order) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(order);
        }
    });
};
exports.updateOrderSellerStatus = async(req, res) => {
    Order.updateOrderSellerStatus(req.body.id, req.body.orderSellerStatus, (err, order) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(order);
        }
    });
};
exports.deleteOrder = async(req, res) => {
    Order.deleteOrder(req.params.id, (err, data) => {
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