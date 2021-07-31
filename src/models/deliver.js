const server = require('../server');

const Deliver = function(deliver){
    this.order_id             = deliver.orderId;
    this.store_id             = deliver.storeId;
    this.courier_id           = deliver.courierId;
    this.courier_name         = deliver.courierName;
    this.courier_phone_num    = deliver.courierPhoneNum;
    this.product_img          = deliver.productImg;
    this.name                 = deliver.name;
    this.price                = deliver.price;
    this.quantity             = deliver.quantity;
    this.subtotal             = deliver.subtotal;
    this.status               = deliver.deliveryStatus;
    this.customer_name        = deliver.customerName;
    this.customer_mobile_num  = deliver.customerMobileNum;
    this.customer_address     = deliver.shippingAddress;
    this.customer_address_lat = deliver.shippingAddressLat;
    this.customer_address_lng = deliver.shippingAddressLng;
    this.order_date           = deliver.orderDate;
}

Deliver.add = (deliver, result) => {

    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("INSERT INTO deliveries SET ?", deliver, (err, res)=> {
            if(err) {
                result(err, null);
                return;
            }
            result(null, {id: res.insertId, ...deliver});
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Deliver.update = (id, deliver, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        const query = "UPDATE deliveries SET courier_id = ?, courier_name = ?, courier_phone_num = ?, status = ? WHERE id = ?" 
        conn.query(query, [deliver.courier_id, deliver.courier_name, deliver.courier_phone_num, deliver.status, id], (err, res) => {
                    if (err) {
                        result(null, err);
                        return;
                    }
                    if (res.affectedRows == 0) {
                        // not found Customer with the id
                        result({ kind: "not_found" }, null);
                        return;
                    }
                    result(null, { id: deliver.id, ...deliver });
        });
        server.mysqlPool.releaseConnection(conn);
    });
};
Deliver.deleteToDeliver = (id, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("DELETE FROM deliveries WHERE id = ?", id, (err, res) => {
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

Deliver.updateToDeliverStatus = (id, status, result) => {
    
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("UPDATE deliveries SET status = ? WHERE id = ?", [status, id], (err, res) => {
                    if (err) {
                        result(null, err);
                        return;
                    }
                    if (res.affectedRows == 0) {
                        // not found Customer with the id
                        result({ kind: "not_found" }, null);
                        return;
                    }
                    result(null, {});
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Deliver.updateCourierStatus = (id, deliver, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("UPDATE deliveries SET cour_lat = ?, cour_lng = ?, watch_id = ?, interval_id = ? WHERE id = ?", [deliver.cour_lat, deliver.cour_lng, deliver.watch_id, deliver.interval_id, id], (err, res) => {
                    if (err) {
                        result(null, err);
                        return;
                    }
                    if (res.affectedRows == 0) {
                        // not found Customer with the id
                        result({ kind: "not_found" }, null);
                        return;
                    }
                    result(null, {});
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Deliver.getToDeliver = (orderId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM deliveries WHERE order_id = "${orderId}"`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res[0]);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Deliver.getCourierPendingDeliveries = (courierId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM deliveries WHERE courier_id = "${courierId}" AND status != "Order Received"`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Deliver.getCourierDeliveredDeliveries = (courierId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM deliveries WHERE courier_id = "${courierId}" AND status = 'Order Received'`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Deliver.getCourierToDeliverProduct = (deliverId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM deliveries WHERE id = "${deliverId}"`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res[0]);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Deliver.getDeliverByCourIdAndStatus = (deliverBody, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM deliveries WHERE courier_id = "${deliverBody.courId}" AND status = "${deliverBody.status}" `, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};
module.exports = Deliver;