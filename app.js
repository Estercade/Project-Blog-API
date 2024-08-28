require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
  passReqToCallback: true,
},
  async (req, jwt_payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: jwt_payload.userId,
        }
      })
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }))

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
  passReqToCallback: true,
},
  async (req, jwt_payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: jwt_payload.userId,
        }
      })
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }))

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username: username
    }
  });
  try {
    if (!user) {
      return res.status(401).send("Incorrect username or password.");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send("Incorrect username or password.");
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_KEY, {
      expiresIn: "3h"
    });
    const currentUser = user.username;
    res.json({ token, currentUser });
  }
  catch (err) {
    res.status(401).send(err);
  }
});

app.post("/posts", passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    next();
  });

app.put("/posts", passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    next();
  });

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