const server = require('../server');


const SukiList = function (sukiList){
    this.user_id  = sukiList.userId;
    this.store_id = sukiList.storeId;
}
SukiList.add = (sukiList, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("INSERT INTO suki_list SET ?", sukiList, (err, res)=> {
            if(err) {
                result(err, null);
                return;
            }
            result(null, {id: res.insertId, ...sukiList});
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

SukiList.selectByUserAndStoreId = (sukiList, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM suki_list WHERE user_id = "${sukiList.userId}" AND store_id = "${sukiList.storeId}"`, (err, res) => {
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
SukiList.selectByUserId = (id, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT suki_list.user_id,
                           suki_list.store_id,
                           stores.img,
                           stores.name,
                           stores.information,
                           stores.location,
                           stores.contact_number
                    FROM suki_list
                    INNER JOIN stores ON suki_list.store_id = stores.id
                    WHERE suki_list.user_id = ${id} ORDER BY suki_list.id DESC`, (err, res) => {
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
SukiList.delete = (id, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("DELETE FROM suki_list WHERE id = ?", id, (err, res) => {
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

module.exports = SukiList;