const server = require('../server');

const Rating = function(rating){
    this.user_id             = rating.userId;
    this.store_id            = rating.storeId;
    this.rating              = rating.rating;
    this.feedback            = rating.feedback;
    this.date_rate           = rating.dateRate;
}

Rating.add = (rating, result) => {
    server.mysqlPool.getConnection( (err, conn) => {
        if(err) {
            conn.release();
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

module.exports = Rating;