const server = require('../server');

const Order = function(order){
    this.store_id             = order.storeId;
    this.user_id              = order.userId;
    this.product_img          = order.img;
    this.name                 = order.name;
    this.price                = order.price;
    this.quantity             = order.quantity;
    this.customer_name        = order.customerName;
    this.status               = order.orderStatus;
    this.seller_status        = order.orderSellerStatus;
    this.order_date           = order.orderDate;
    this.customer_mobile_num  = order.customerMobileNum;
    this.customer_address     = order.customerAddress;
    this.customer_address_lat = order.customerAddressLat;
    this.customer_address_lng = order.customerAddressLng;
    this.order_note           = order.orderNote;
    this.classification_buyer = order.classificationBuyer;
}

Order.add = (order, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
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
Order.getStoreNoneOrders = (storeId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`SELECT * FROM orders WHERE store_id = "${storeId}" AND status = "None" AND seller_status != "Order Received" ORDER BY ID DESC`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};
Order.getStorePendingOrders = (storeId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`SELECT * FROM orders WHERE store_id = "${storeId}" AND status = "Pending" AND seller_status != "Order Received" ORDER BY ID DESC`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};
Order.getStoreAcceptOrders = (storeId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`SELECT * FROM orders WHERE store_id = "${storeId}" AND status = "Accept" AND seller_status != "Order Received" ORDER BY ID DESC`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};
Order.getStoreDeclineOrders = (storeId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`SELECT * FROM orders WHERE store_id = "${storeId}" AND status = "Decline" AND seller_status != "Order Received" ORDER BY ID DESC`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};
Order.getStoreOnTheWayOrders = (storeId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`SELECT * FROM orders WHERE store_id = "${storeId}" AND status = "On The Way" AND seller_status != "Order Received" ORDER BY ID DESC`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
}
Order.getStoreDeliverOrders = (storeId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`SELECT * FROM orders WHERE store_id = "${storeId}" AND status = "Deliver" AND seller_status != "Order Received" ORDER BY ID DESC`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
}
Order.getStoreAllOrders = (storeId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`SELECT * FROM orders WHERE store_id = "${storeId}" AND seller_status != "Order Received" ORDER BY ID DESC`, (err, res) => {
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
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`SELECT * FROM orders WHERE status = "Order Received" AND store_id = "${storeId}"`, (err, res) => {
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
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
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
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`SELECT * FROM orders WHERE user_id = "${userId}" AND status != "Order Received"`, (err, res) => {
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
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`SELECT * FROM orders WHERE user_id = "${userId}" AND status = "Order Received"`, (err, res) => {
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
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query("UPDATE orders SET status = ?, seller_status = ? WHERE id = ?", [status, status, id], (err, res) => {
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
Order.updateOrderSellerStatus = (id, status, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query("UPDATE orders SET seller_status = ? WHERE id = ?", [status, id], (err, res) => {
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
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
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