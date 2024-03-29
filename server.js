const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
var cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");

var app = express();
const server = http.createServer(app);

const io = socketIo(server);

function onNewOrder(order) {
  io.emit("newOrder", order);
}

module.exports = { app, onNewOrder };

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(4000, () => {
  console.log("Listening on port 4000");
});

function onNewOrder(order) {
  io.emit("newOrder", order); // שולחים את ההזמנה החדשה לכל הלקוחות המחוברים
}

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

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
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
