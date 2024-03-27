const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
var cors = require("cors");

var app = express();
app.use(cors());

const port = process.env.PORT || 5000;

//DB configuration
const db = config.get("mongoURI");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Mongoose connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/", require("./routes/index"));
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/orders", require("./routes/api/orders"));
app.use("/api/preferences", require("./routes/api/preferences"));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static("frontend/build"));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
