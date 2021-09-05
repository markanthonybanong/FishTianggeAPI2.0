if (typeof(PhusionPassenger) != 'undefined') { //for cpanel
    PhusionPassenger.configure({ autoInstall: false });
}
// if (process.env.NODE_ENV === 'development') {
//     require('dotenv').config();
// }
require('dotenv').config();
var cors       = require('cors');
const mysql    = require('mysql2');
const routes   = require('./routes');
const express  = require('express')
const app      = express();
const port     = process.env.PORT;
const http     = require("http");
const server   = http.createServer(app);
 app.use(cors());
 
app.use(express.urlencoded({limit: "500mb", extended: true, parameterLimit:50000}));
app.use(express.json({limit: '500mb'}));

app.use(routes());
if (typeof(PhusionPassenger) != 'undefined') {
    server.listen('passenger');
} else {
    server.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}



const mysql_pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.mysqlPool = mysql_pool;