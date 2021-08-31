const server = require('../server');

const Application = function(application){
    this.full_name    = application.fullName;
    this.user_id      = application.userId;
    this.address      = application.address;
    this.phone_number = application.phoneNumber;
    this.email        = application.email;
    this.status       = application.status;
    this.img          = application.img;
    this.type         = application.type;
}

Application.addApplication = (application, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`INSERT INTO applications SET ?`, application, (err, res) => {
            if(err) {
                result(err, null);
                return
            }
            result(null, {id: res.insertId, ...application});
        });
    });
};

Application.getApplicationByUserId = (userId, result) => {
    server.mysqlPool.getConnection((err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`SELECT * FROM applications WHERE user_id = "${userId}"`, (err, res) => {
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
    });
};

Application.deleteApplication = (id, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query("DELETE FROM applications WHERE id = ?", id, (err, res) => {
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
    });
};

module.exports = Application;