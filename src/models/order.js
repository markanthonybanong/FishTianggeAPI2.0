const server = require('../server');

const Order = function(order){
    this.store_id            = order.storeId;
    this.user_id             = order.userId;
    this.product_img         = order.img;
    this.name                = order.name;
    this.price               = order.price;
    this.quantity            = order.quantity;
    this.customer_name       = order.customerName;
    this.status              = order.orderStatus;
    this.order_date          = order.orderDate;
    this.customer_mobile_num = order.customerMobileNum;
    this.customer_address    = order.customerAddress;
    this.order_note          = order.orderNote;
}

Order.add = (order, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("INSERT INTO orders SET ?", order, (err, res)=> {
            if(err) {
                result(err, null);
                return;
            }
            result(null, {id: res.insertId, ...order});
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Order.getStorePendingOrders = (storeId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM orders WHERE 
                        store_id = "${storeId}" AND status = "Pending"
                        or store_id = "${storeId}" AND status = "None"
                        or store_id = "${storeId}" AND status = "Accept"
                        or store_id = "${storeId}" AND status = "OnTheWay"`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Order.getStoreDeliveredOrders = (storeId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM orders WHERE status = "Deliver" AND store_id = "${storeId}"`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Order.getOrder = (orderId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM orders WHERE id = "${orderId}"`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res[0]);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Order.getPendingOrdersByUserId = (userId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM orders WHERE user_id = "${userId}" AND status != "Deliver" AND status != "Decline"`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Order.getDeliveredOrdersByUserId = (userId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM orders WHERE user_id = "${userId}" AND status = "Deliver"`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};
Order.updateOrderStatus = (id, status, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("UPDATE orders SET status = ? WHERE id = ?", [status, id], (err, res) => {
                    if (err) {
                        result(null, err);
                        return;
                    }
                    if (res.affectedRows == 0) {
                        // not found Customer with the id
                        result({ kind: "not_found" }, null);
                        return;
                    }
                    result(null, { id: status.id, ...status });
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Order.deleteOrder = (id, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("DELETE FROM orders WHERE id = ?", id, (err, res) => {
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

module.exports = Order;