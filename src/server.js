if (typeof(PhusionPassenger) != 'undefined') { //for cpanel
    PhusionPassenger.configure({ autoInstall: false });
}
require('dotenv').config();
var cors       = require('cors');
var bodyParser = require('body-parser');
const mysql    = require('mysql2');
const routes   = require('./routes');
const express  = require('express')
const app      = express();
const port     = process.env.PORT;
const io       = require('socket.io')(8080, {
                    cors: {
                        origin : "*",
                    }
                });
app.use(cors());
io.on('connection', socket =>{
    socket.on('disconnect', function(){
    });
    require('./socket/index')(io, socket);
});


app.use(bodyParser.urlencoded({limit: "500mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: '500mb'}));

app.use(routes());
if (typeof(PhusionPassenger) != 'undefined') {
    app.listen('passenger');
} else {
    app.listen(port, () => {
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