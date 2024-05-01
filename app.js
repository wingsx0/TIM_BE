var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var movieRouter = require("./routes/movie");
var dienvienRouter = require("./routes/dienvien");
const usersRouter = require("./routes/users");
var theloaiRouter = require("./routes/theloai");
var dsDienVienRouter = require("./routes/ds_dienvien_phim");
var veRouter = require("./routes/ve");
var xuatchieuRouter = require("./routes/xuatchieu");
var phongRouter = require("./routes/phong");
var slideRouter = require("./routes/slide");
var billRouter = require("./routes/bill");
var binhluanRouter = require("./routes/binh_luan");
var searchRouter = require("./routes/search")
var vnpayRouter = require("./routes/vnpay");
var app = express();

// view engine setup
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/movie", movieRouter);
app.use("/dienvien", dienvienRouter);
app.use("/users", usersRouter);
app.use("/theloai", theloaiRouter);
app.use("/dsdienvien", dsDienVienRouter);
app.use("/ve", veRouter);
app.use("/xuatchieu", xuatchieuRouter);
app.use("/phong", phongRouter);
app.use("/slide", slideRouter);
app.use("/bill", billRouter);
app.use("/binhluan", binhluanRouter);
app.use("/search" , searchRouter);
app.use("/vnpay", vnpayRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
