const server = require('../server');

const Store = function(myStore){
    this.user_id        = myStore.userId;
    this.img            = myStore.img;
    this.name           = myStore.name;
    this.information    = myStore.information;
    this.location       = myStore.location;
    this.contact_number = myStore.contactNumber;
}

Store.getStoreByUserId = (userId, result) => {
    server.mysqlPool.getConnection((err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`SELECT * FROM stores WHERE user_id = "${userId}"`, (err, res) => {
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

Store.getStores =  result => {
    server.mysqlPool.getConnection((err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query("SELECT * FROM stores ORDER BY id DESC", (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Store.add = (store, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`INSERT INTO stores SET ?`, store, (err, res) => {
            if(err) {
                result(err, null);
                return
            }
            result(null, {id: res.insertId, ...store});
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

Store.update = (id, store, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query("UPDATE stores SET img = ?, name = ?, information = ?, location = ?, contact_number = ? WHERE id = ?",
                     [store.img, store.name, store.information, store.location, store.contact_number, id ], (err, res) => {
                    if (err) {
                        result(null, err);
                        return;
                    }
                    if (res.affectedRows == 0) {
                        // not found Customer with the id
                        result({ kind: "not_found" }, null);
                        return;
                    }
                    result(null, { id: store.id, ...store });
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

module.exports = Store;