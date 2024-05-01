var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost', user: 'root', password: '', database: 'infinity_movie'
});
db.connect(() => console.log('Đã kết nối đến cơ sở dữ liệu'));


const logoutUser = (req, res) => {
    // Xóa thông tin phiên làm việc của người dùng (ví dụ: xóa token hoặc xóa cookies)
    // Ví dụ: xóa token
    res.clearCookie('accessToken'); // Clear access token cookie (if using cookies)

    // Chuyển hướng người dùng về trang chủ
    res.redirect('/'); // Chuyển hướng về trang chủ

};


module.exports ={logoutUser}