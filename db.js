const mysql = require('mysql');
require('dotenv').config();


const db = mysql.createConnection({
    host        : process.env.MYSQLHOST,
    user        : process.env.MYSQLUSER,
    password    : process.env.MYSQLPASSWORD,
    database    : process.env.MYSQLDB,
    port        : process.env.MYSQLPORT,
    socketpath  : process.env.SOCKETPATH,
    raise_on_warnings: true
});


module.exports = db;