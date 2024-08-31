require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
const auth = require("./utils/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/login", auth.login);

// protected routes
app.put("/users", auth.authenticate, (req, res, next) => next());
app.delete("/users", auth.authenticate, (req, res, next) => next());
app.get("/users/:userid/drafts", auth.authenticate, (req, res, next) => next());
app.post("/posts", auth.authenticate, (req, res, next) => next());
app.put("/posts", auth.authenticate, (req, res, next) => next());
app.delete("/posts", auth.authenticate, (req, res, next) => next());
app.post("comments", auth.authenticate, (req, res, next) => next());
app.put("comments", auth.authenticate, (req, res, next) => next());
app.delete("comments", auth.authenticate, (req, res, next) => next());

app.use("/users", routes.user);
app.use("/posts", routes.post);
app.use("/comments", routes.comment);

app.use((err, req, res, next) => {
  res.status(404).json("Not found");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', function (err) {
  if (err) console.log("Error in server setup")
  console.log("Started listening on %s", PORT);
});