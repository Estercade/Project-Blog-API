const passport = require("passport");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");

// authenticate user
passport.use("jwt", new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
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

// authenticate admin
passport.use("jwtadmin", new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
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

// log users in and return JWT
async function login(req, res, next) {
  const { username, password } = req.body;
  if (!username | !password) {
    return res.status(401).send("Incorrect username or password.");
  }
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
}

// authentication middleware for protected routes
const authenticate = passport.authenticate("jwt", {
  session: false,
});

// admin authentication middleware for routes
const adminAuthenticate = passport.authenticate("jwtadmin", {
  session: false,
});

module.exports = {
  login,
  authenticate,
  adminAuthenticate
}