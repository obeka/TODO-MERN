const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const GitHubStrategy = require("passport-github2");
const User = require("../models/user-model.js");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {}
});

passport.use(
  new GoogleStrategy(
    {
      //options for the google strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/user/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      // passport callback func
      try {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          done(null, user);
        } else {
          const newUser = new User({
            username: profile.displayName,
            signupType: "google",
            email: profile.emails[0].value,
            todos: [],
          });
          try {
            await newUser.save();
            done(null, newUser);
          } catch (error) {}
        }
      } catch (error) {}
    }
  )
);
passport.use(
  new GitHubStrategy(
    {
      //options for the google strategy
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/user/github/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      // passport callback func
      try {
        const user = await User.findOne({ signupId: profile.id });
        if (user) {
          done(null, user);
        } else {
          const newUser = new User({
            username: profile.username,
            signupType: "github",
            signupId: "46748217",
            //email: profile.emails[0].value,
            todos: [],
          });
          try {
            await newUser.save();
            done(null, newUser);
          } catch (error) {}
        }
      } catch (error) {}
    }
  )
);
