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
io.on('connection', socket =>{
    require('./socket/index')(io, socket);
});
app.use(cors());

app.use(bodyParser.urlencoded({limit: "500mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: '500mb'}));

app.use(routes());

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});

const mysql_pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.mysqlPool = mysql_pool;