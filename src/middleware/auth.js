const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/user.model.js");

const jwt_secret = "*#$,.32zsml*4%%&$$#";

const strategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwt_secret,
  },
  async (jwtPayload, done) => {
    try {
      const userFound = await User.findById(jwtPayload._id);

      if (!userFound) {
        const error = new Error("User not found");
        console.log(error, false);
      }

      done(null, userFound);
    } catch (error) {
      done(error);
    }
  }
);

passport.use(strategy);

const initialize = () => {
  return passport.initialize();
};

const authenticate = () => {
  return passport.authenticate("jwt", { session: false });
};

module.exports = {
  initialize,
  authenticate,
};
