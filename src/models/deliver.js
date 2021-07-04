const server = require('../server');

const Deliver = function(deliver){
    this.order_id            = deliver.orderId;
    this.store_id            = deliver.storeId;
    this.courier_id          = deliver.courierId;
    this.courier_name        = deliver.courierName;
    this.courier_phone_num   = deliver.courierPhoneNum;
    this.product_img         = deliver.productImg;
    this.name                = deliver.name;
    this.price               = deliver.price;
    this.quantity            = deliver.quantity;
    this.subtotal            = deliver.subtotal;
    this.status              = deliver.deliveryStatus;
    this.customer_name       = deliver.customerName;
    this.customer_mobile_num = deliver.customerMobileNum;
    this.customer_address    = deliver.shippingAddress;
    this.order_date          = deliver.orderDate;
    this.cour_lat            = deliver.courLat;
    this.cour_lng            = deliver.courLng;
    this.watch_id            = deliver.watchId;
    this.interval_id         = deliver.intervalId;
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
        conn.query("UPDATE deliveries SET courier_name = ?, courier_phone_num = ?, status = ? WHERE id = ?", [deliver.courier_name, deliver.courier_phone_num, 'Pending', id], (err, res) => {
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
        conn.query(`SELECT * FROM deliveries WHERE courier_id = "${courierId}" AND status != "Deliver" AND status != "Decline"`, (err, res) => {
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
        conn.query(`SELECT * FROM deliveries WHERE courier_id = "${courierId}" AND status = 'Deliver'`, (err, res) => {
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

module.exports = Deliver;