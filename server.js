const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
var cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");
const { router: ordersRouter, eventEmitter } = require("./routes/api/orders");

var app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  eventEmitter.on("newOrder", (order) => {
    socket.emit("newOrder", order);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(cors());

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
app.use("/api/orders", ordersRouter);

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const auth = require("./middleware/auth");
