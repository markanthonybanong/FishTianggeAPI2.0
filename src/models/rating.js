const server = require('../server');

const Rating = function(rating){
    this.store_id     = rating.storeId;
    this.order_id     = rating.orderId;
    this.star_number  = rating.starNumber;    
    this.user_comment = rating.userComment;
    this.date_rate    = rating.dateRate;
    this.user_id      = rating.userId;
}

Rating.add = (rating, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query("INSERT INTO ratings SET ?", rating, (err, res)=> {
            if(err) {
                result(err, null);
                return;
            }
            result(null, {id: res.insertId, ...rating});
        });
        server.mysqlPool.releaseConnection(conn);
    });
};
Rating.selectByUserAndOrderId = (rating, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`SELECT * FROM ratings WHERE order_id = "${rating.orderId}" AND user_id = "${rating.userId}"`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            if(res.length){
                result(null, res[0]);
                return
            }
            //not found
            result({kind: "not_found"}, null);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};
Rating.selectByStoreId = (storeId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`SELECT ratings.id,
                           ratings.store_id,
                           ratings.order_id,
                           ratings.star_number,
                           ratings.user_comment,
                           ratings.date_rate,
                           ratings.user_id,
                           mobile_users.img,
                           mobile_users.first_name,
                           mobile_users.last_name
                    FROM ratings
                    INNER JOIN mobile_users ON ratings.user_id = mobile_users.id
                    WHERE ratings.store_id = ${storeId}
                    `, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            if(res.length){
                result(null, res);
                return
            }
            //not found
            result({kind: "not_found"}, null);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};
Rating.selectById = (id, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`SELECT ratings.id,
                           ratings.store_id,
                           ratings.order_id,
                           ratings.star_number,
                           ratings.user_comment,
                           ratings.date_rate,
                           ratings.user_id,
                           mobile_users.img,
                           mobile_users.first_name,
                           mobile_users.last_name
                    FROM ratings
                    INNER JOIN mobile_users ON ratings.user_id = mobile_users.id
                    WHERE ratings.id = ${id}
                    `, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            if(res.length){
                result(null, res[0]);
                return
            }
            //not found
            result({kind: "not_found"}, null);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};
Rating.update = (id, rating, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query("UPDATE ratings SET date_rate = ?, star_number = ?, user_comment = ? WHERE id = ?",
                     [rating.date_rate, rating.star_number, rating.user_comment, id ], (err, res) => {
                    if (err) {
                        result(null, err);
                        return;
                    }
                    if (res.affectedRows == 0) {
                        // not found Customer with the id
                        result({ kind: "not_found" }, null);
                        return;
                    }
                    result(null, { id: rating.id, ...rating });
                    });
        server.mysqlPool.releaseConnection(conn);
    });
};
Rating.delete = (id, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query("DELETE FROM ratings WHERE id = ?", id, (err, res) => {
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

module.exports = Rating;