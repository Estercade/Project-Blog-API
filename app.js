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
  secretOrKey: process.env.SECRET_KEY
},
  async (jwt_payload, done) => {
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

app.use(express.json())
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
      throw new Error("Incorrect username or password.");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Incorrect username or password.");
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_KEY, {
      expiresIn: "3h"
    });
    res.json({ token });
  }
  catch (err) {
    res.status(401).send(err);
  }
});

app.use("/protected", passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    res.json("hello protected world");
  })

app.use("/users", routes.user);
app.use("/posts", routes.post);
app.use("/comments", routes.comment);

app.use((err, req, res, next) => {
  console.log("bad");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App is now listening on port ${PORT}`));