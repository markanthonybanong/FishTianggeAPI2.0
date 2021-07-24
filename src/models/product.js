const server = require('../server');

const Product = function(product){
    this.store_id     = product.storeId;
    this.img          = product.img;
    this.remark       = product.remark;
    this.name         = product.name;
    this.weight       = product.weight;
    this.price        = product.price;
    this.is_available = product.isAvailable;
    this.category     = product.category;
    this.weight_in    = product.weightIn;
    this.status       = product.status
}

Product.add = (product, result) => {
     
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("INSERT INTO products SET ?", product, (err, res)=> {
            if(err) {
                result(err, null);
                return;
            }
            result(null, {id: res.insertId, ...product});
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Product.getStoreProducts = (storeId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM products WHERE store_id = "${storeId}" AND status = "InStore"`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Product.getAllStoreProducts = (storeId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM products WHERE status = "InStore" ORDER BY id DESC`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Product.deleteProduct = (id, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
            if (err) {
                result(null, err);
                return;
              }
              if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
              }
              result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Product.getProduct = (productId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM products WHERE id = "${productId}"`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res[0]);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Product.update = (id, product, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("UPDATE products SET img = ?,store_id = ?, remark = ?, name = ?, weight = ?, price = ?, is_available = ?, category = ?, weight_in = ? WHERE id = ?",
                     [product.img, product.store_id, product.remark, product.name, product.weight, product.price, product.is_available, product.category, product.weight_in, id ], (err, res) => {
                    if (err) {
                        result(null, err);
                        return;
                    }
                    if (res.affectedRows == 0) {
                        // not found Customer with the id
                        result({ kind: "not_found" }, null);
                        return;
                    }
                    result(null, { id: product.id, ...product });
        });
        server.mysqlPool.releaseConnection(conn);            
    });
};

Product.updateStatus = (id, product, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("UPDATE products SET status = ? WHERE id = ?",[ product.status, id ], (err, res) => {
                    if (err) {
                        result(null, err);
                        return;
                    }
                    if (res.affectedRows == 0) {
                        // not found Customer with the id
                        result({ kind: "not_found" }, null);
                        return;
                    }
                    result(null, { id: product.id, ...product });
        });
        server.mysqlPool.releaseConnection(conn);
    });
};
Product.getArchieveStoreProducts = (storeId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM products WHERE store_id = "${storeId}" AND status = "InArchieve"`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};
Product.getStoreSameProductsCategory = (product, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM products WHERE store_id = "${product.storeId}" && category = "${product.category}" && id != "${product.productId}"`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

module.exports = Product;