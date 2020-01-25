const mysql = require('mysql');

var pool = mysql.createPool({
    "user":"root",
    "password":"",
    "database":"teste",
    "host":"localhost"

});
exports.pool = pool;