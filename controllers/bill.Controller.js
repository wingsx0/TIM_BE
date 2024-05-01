

const GetBill = async function (req, res, next) {
    const sql = 'SELECT * FROM hoa_don';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else {
            res.status(200).json(results);
        }
    });
};  

module.exports = {GetBill}