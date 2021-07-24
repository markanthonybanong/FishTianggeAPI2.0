const server = require('../server');

const Cart = function(cart){
    this.name       = cart.name;
    this.price      = cart.price;
    this.weight     = cart.weight;
    this.quantity   = cart.quantity;
    this.remark     = cart.remark;
    this.category   = cart.category;
    this.product_id = cart.productId;
    this.store_id   = cart.storeId;
    this.user_id    = cart.userId;     
    this.img        = cart.img;
    
}

Cart.add = (cart, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("INSERT INTO carts SET ?", cart, (err, res)=> {
            if(err) {
                result(err, null);
                return;
            }
            result(null, {id: res.insertId, ...cart});
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Cart.getUserCartItems = (userId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM carts WHERE user_id = "${userId}" ORDER BY id DESC`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Cart.updateQuantity = (id, quantity, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("UPDATE carts SET quantity = ? WHERE id = ?",[quantity,  id ], (err, cartItem) => {
                    if (err) {
                        result(null, err);
                        return;
                    }
                    if (cartItem.affectedRows == 0) {
                        // not found Customer with the id
                        result({ kind: "not_found" }, null);
                        return;
                    }
                    result(null, { id: cartItem.id, ...cartItem });
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Cart.removeCartItem = (id, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("DELETE FROM carts WHERE id = ?", id, (err, res) => {
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

Cart.removeCartItems = (userId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("DELETE FROM carts WHERE user_id = ?", userId, (err, res) => {
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

module.exports = Cart;