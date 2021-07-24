const httpStatusCode = require('http-status-codes');
const Cart           = require('../models/Cart'); 

exports.add = async(req, res) => {
    const cart = new Cart({
        name: req.body.name,
        price: req.body.price,
        weight: req.body.weight,
        quantity: req.body.quantity,
        remark: req.body.remark,
        category: req.body.category,
        productId: req.body.id,
        storeId: req.body.storeId,
        userId: req.body.userId,
        img: req.body.img
    });
    Cart.add(cart, (err, cart) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(cart);
        }
    });
};

exports.getUserCartItems = async(req, res) => {
    Cart.getUserCartItems(req.body.userId, (err, cartItems)=> {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({
                message: err
            });
        } else {
            res.status(httpStatusCode.OK).json(cartItems);
        }
    });
};

exports.updateQuantity = async(req, res) => {
    Cart.updateQuantity(req.body.cartId, req.body.quantity, (err, cart) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(cart);
        }
    });
};

exports.removeCartItem = async(req, res) => {
    Cart.removeCartItem(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(httpStatusCode.NOT_FOUND).send({
                message: `Not found cart item with id ${req.params.id}.`
              });
            } else {
              res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
                message: "Could not delete cart item with id " + req.params.id
              });
            }
          } else res.status(httpStatusCode.OK).send({ message: `Cart item was deleted successfully!` });
    });
}

exports.removeCartItems = async(req, res) => {
    Cart.removeCartItems(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(httpStatusCode.NOT_FOUND).send({
                message: `Not found cart item with id ${req.params.id}.`
              });
            } else {
              res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
                message: "Could not delete cart item with id " + req.params.id
              });
            }
          } else res.status(httpStatusCode.OK).send({ message: `Cart item was deleted successfully!` });
    });
}