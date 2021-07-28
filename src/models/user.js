const server = require('../server');

const User = function(user){
    this.img          = user.img;
    this.first_name   = user.firstName;
    this.last_name    = user.lastName;
    this.user_type    = user.userType;
    this.email        = user.email;
    this.phone_number = user.phoneNumber;
    this.password     = user.password;
    this.address      = user.address;
}

User.create = (user, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("INSERT INTO mobile_users SET ?", user, (err, res)=> {
            if(err) {
                result(err, null);
                return;
            }
            result(null, {id: res.insertedId, ...user});
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

User.update = (id, user, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("UPDATE mobile_users SET img = ?, first_name = ?, last_name = ?, email = ?, phone_number = ?, address = ? WHERE id = ?",
                     [user.img, user.first_name, user.last_name, user.email, user.phone_number, user.address, id ], (err, res) => {
                    if (err) {
                        result(null, err);
                        return;
                    }
                    if (res.affectedRows == 0) {
                        // not found Customer with the id
                        result({ kind: "not_found" }, null);
                        return;
                    }
                    result(null, { id: user.id, ...user });
                    });
        server.mysqlPool.releaseConnection(conn);
    });
};

User.udpateUserStoreId = (userId, storeId, result) => {
    server.mysqlPool.getConnection((err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("UPDATE mobile_users set store_id = ? where id = ?", [storeId, userId], (err, user) => {
            if (err) {
                result(null, err);
                return 
            }
            if (user.affectedRows == 0){
                  // not found Customer with the id
                  result({ kind: "not_found" }, null);
                  return;
            }
            result(null, {id: user.id, ...user});
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

User.onUserLogin = (user, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM mobile_users WHERE email = "${user.email}" AND password = "${user.password}" OR phone_number = "${user.email}" AND  password = "${user.password}"`, (err, res) => {
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

User.getUser = (userId, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM mobile_users WHERE id = "${userId}"`, (err, res) => {
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

User.getCouriers = (xx, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("SELECT * FROM mobile_users WHERE user_type = 'Courier' ORDER BY first_name", (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};

User.getMobileNumAndEmail = (user, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query(`SELECT * FROM mobile_users WHERE email = "${user.email}" OR phone_number = "${user.phoneNum}" ORDER BY first_name`, (err, res) => {
            if(err) {
                result (err, null);
                return;
            }
            result(null, res);
        });
        server.mysqlPool.releaseConnection(conn);
    });
};
User.updatePassword = (id, user, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
            throw err;
        }
        conn.query("UPDATE mobile_users SET password = ? WHERE id = ?",
                     [user.password, id ], (err, res) => {
                    if (err) {
                        result(null, err);
                        return;
                    }
                    if (res.affectedRows == 0) {
                        // not found Customer with the id
                        result({ kind: "not_found" }, null);
                        return;
                    }
                    result(null, { id: user.id, ...user });
                    });
        server.mysqlPool.releaseConnection(conn);
    });
};

module.exports = User;