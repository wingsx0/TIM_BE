const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const BillControllers = require("../controllers/bill.Controller")
// Kết nối đến cơ sở dữ liệu MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'infinity_movie'
});

// Kết nối đến cơ sở dữ liệu
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Đã kết nối đến cơ sở dữ liệu MySQL');
});

router.get('/', BillControllers.GetBill)


module.exports = router;
