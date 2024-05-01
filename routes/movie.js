var express = require("express");
var router = express.Router();
var mysql = require("mysql");
const movie = require("../controllers/movie.Controller");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "infinity_movie",
});
db.connect(() => console.log("Đã kết nối đến cơ sở dữ liệu"));

// API endpoint lấy danh sách phim
router.get("/", movie.listMovie)

// API endpoint thêm phim mới
router.post("/",movie.createMovie )



// API endpoint lấy chi tiết phim theo ID
router.get("/:id",movie.detailMovie )

// API delete phim theo id
router.delete("/:id", movie.deleteMovie)
// Endpoint để ẩn một bộ phim

// API endpoint cập nhật thông tin phim
router.put("/:id",movie.updetaMovie)


// API endpoint lấy danh sách phim theo loại
router.get("/loai/:id_loai",movie.listMovieId)


// API endpoint lấy danh sách phim theo thể loại
router.get("/the-loai/:id_the_loai", movie.listMovieCategori)

// API endpoint lấy danh sách phim theo diễn viên
router.get("/dien-vien/:id_dien_vien",movie.listMovieActress )



// API endpoint xóa bình luận của phim
router.delete("/:id/binhluan/:id_binhluan", async (req, res) => {
  const id_phim = req.params.id;
  const id_binhluan = req.params.id_binhluan;

  try {
    const query =
      "DELETE FROM binh_luan WHERE id_phim = ? AND id_binh_luan = ?";
    await db.query(query, [id_phim, id_binhluan]);
    res.status(200).json({ message: "Xóa bình luận thành công" });
  } catch (error) {
    console.error("Lỗi xóa bình luận:", error);
    res.status(500).send("Lỗi xóa bình luận");
  }
});
// API endpoint lấy danh sách bình luận của phim
router.get("/:id/binhluan", async (req, res) => {
  const id_phim = req.params.id;

  try {
    const query = "SELECT * FROM binh_luan WHERE id_phim = ?";
    const results = await db.query(query, [id_phim]);
    res.status(200).json(results);
  } catch (error) {
    console.error("Lỗi truy vấn bình luận của phim:", error);
    res.status(500).send("Lỗi truy vấn bình luận của phim");
  }
});
// API endpoint lấy danh sách đánh giá của phim
router.get("/:id/danhgia", async (req, res) => {
  const id_phim = req.params.id;

  try {
    const query = "SELECT * FROM rating WHERE id_phim = ?";
    const results = await db.query(query, [id_phim]);
    res.status(200).json(results);
  } catch (error) {
    console.error("Lỗi truy vấn đánh giá của phim:", error);
    res.status(500).send("Lỗi truy vấn đánh giá của phim");
  }
});

module.exports = router;
