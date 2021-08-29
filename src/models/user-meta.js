const server = require('../server');


const UserMeta = function (userMeta){
    this.user_id    = userMeta.userId;
    this.meta_key   = userMeta.metaKey;
    this.meta_value = userMeta.metaValue
}
UserMeta.add = (userMeta, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query("INSERT INTO user_meta SET ?", userMeta, (err, res)=> {
            if(err) {
                result(err, null);
                return;
            }
            result(null, {id: res.insertId, ...userMeta});
        });
        server.mysqlPool.releaseConnection(conn);
    });
};
UserMeta.selectById = (id, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`SELECT * FROM user_meta WHERE id = "${id}"`, (err, res) => {
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
UserMeta.selectByUserIdAndMetaKey = (userMeta, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`SELECT * FROM user_meta WHERE user_id = "${userMeta.userId}" AND meta_key = "${userMeta.metaKey}"`, (err, res) => {
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
UserMeta.update = (id, userMeta, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query("UPDATE user_meta SET meta_key = ?, meta_value = ? WHERE id = ?",
                     [userMeta.meta_key, userMeta.meta_value, id ], (err, res) => {
                    if (err) {
                        result(null, err);
                        return;
                    }
                    if (res.affectedRows == 0) {
                        // not found Customer with the id
                        result({ kind: "not_found" }, null);
                        return;
                    }
                    result(null, { id: userMeta.id, ...userMeta });
                    });
        server.mysqlPool.releaseConnection(conn);
    });
};
UserMeta.delete = (id, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query("DELETE FROM user_meta WHERE id = ?", id, (err, res) => {
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

module.exports = UserMeta;