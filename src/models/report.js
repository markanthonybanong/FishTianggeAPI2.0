const server = require('../server');
const Report = function (report){
    this.store_id      = report.storeId;
    this.order_id      = report.orderId;
    this.deliver_id    = report.deliverId;
    this.user_comment  = report.userComment;
    this.date_reported = report.dateReported;
    this.user_id       = report.userId;
}
Report.add = (report, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query("INSERT INTO reports SET ?", report, (err, res)=> {
            if(err) {
                result(err, null);
                return;
            }
            result(null, {id: res.insertId, ...report});
        });
        server.mysqlPool.releaseConnection(conn);
    });
};
Report.selectByUserAndOrderId = (report, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            if (conn) conn.release();
            //we don't release connection if there is no connection :)
            throw err;
        }
        conn.query(`SELECT * FROM reports WHERE order_id = "${report.orderId}" AND user_id = "${report.userId}"`, (err, res) => {
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

module.exports = Report;