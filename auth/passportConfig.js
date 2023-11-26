const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const passportConfig = (passport) => {
  passport.use(
    "login-username-password",
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      (email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: "Incorrect email or password",
              });
            }
            bcrypt.compare(password, user.password, (err, res) => {
              if (err) return done(err);
              if (res === false)
                return done(null, false, {
                  message: "Incorrect email or password",
                });
              return done(null, user);
            });
          })
          .catch((err) => {
            return done(err);
          });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });
};

module.exports = passportConfig;
