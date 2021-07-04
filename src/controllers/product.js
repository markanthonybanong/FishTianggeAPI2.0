const httpStatusCode = require('http-status-codes');
const Product        = require('../models/Product'); 

exports.addProduct = async(req, res) => {
    const product = new Product({
        storeId: req.body.storeId,
        img: req.body.img,
        remark: req.body.remark,
        name: req.body.name,
        weight: req.body.weight,
        price: req.body.price,
        isAvailable: req.body.isAvailable,
        weightIn: req.body.weightIn,
        status: 'InStore'
    });
  
    Product.add(product, (err, product) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(product);
        }
    });
};

exports.getStoreProducts = async(req, res) => {
    Product.getStoreProducts(req.body.storeId, (err, products)=> {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({
                message: err
            });
        } else {
            res.status(httpStatusCode.OK).json(products);
        }
    });
};
exports.getAllStoreProducts = async(req, res) => {
    Product.getAllStoreProducts(null, (err, products)=> {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({
                message: err
            });
        } else {
            res.status(httpStatusCode.OK).json(products);
        }
    });
};

exports.deleteProduct = async(req, res) => {
    Product.deleteProduct(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(httpStatusCode.NOT_FOUND).send({
                message: `Not found product with id ${req.params.id}.`
              });
            } else {
              res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
                message: "Could not delete prodct with id " + req.params.id
              });
            }
          } else res.status(httpStatusCode.OK).send({ message: `Prodcut was deleted successfully!` });
    });
}
exports.getProduct = async(req, res) => {
    Product.getProduct(req.body.productId, (err, product)=> {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({
                message: err
            });
        } else {
            res.status(httpStatusCode.OK).json(product);
        }
    });
};
exports.updateProduct = async(req, res) => {
    const product  = new Product({
        img: req.body.img,
        storeId: req.body.storeId,
        remark: req.body.remark,
        name: req.body.name,
        weight: req.body.weight,
        price: req.body.price,
        isAvailable: req.body.isAvailable,
        weightIn: req.body.weightIn,
        status: req.body.status
    });
    Product.update(req.body.id, product, (err, product) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(product);
        }
    });
};

exports.updateProductStatus = async(req, res) => {
    const product  = new Product({
                 status: req.body.status
    });
    Product.updateStatus(req.body.productId, product, (err, product) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(product);
        }
    });
};

exports.getArchieveStoreProducts = async(req, res) => {
    Product.getArchieveStoreProducts(req.body.storeId, (err, products)=> {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({
                message: err
            });
        } else {
            res.status(httpStatusCode.OK).json(products);
        }
    });
};