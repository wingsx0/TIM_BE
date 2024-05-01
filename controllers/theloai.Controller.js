var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost', user: 'root', password: '', database: 'infinity_movie'
});
db.connect(() => console.log('Đã kết nối đến cơ sở dữ liệu'));



module.exports ={}