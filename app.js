const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./DBConnection");
const engine = require("ejs-mate");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/User");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const port = 3000;
const isLoggedIn = require("./middlewares/isLoggedIn");

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const sessionOptions = {
  secret: "supersecretstring",
  resave: true,
  saveUninitialized: true,
};
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static("/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Flash message extracter
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.get("/profile", isLoggedIn, (req, res, next) => {
  res.status(200).render("profile.ejs");
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "You are logged in");
    res.status(200).redirect("/register");
  }
);

app.get("/login", (req, res) => {
  res.status(200).render("login.ejs");
});

app.post("/register", async (req, res) => {
  req.flash("success", "You are on register page");
  console.log(req.body);

  if (req.body.user) {
    let registeredUser = await User.register(
      req.body.user,
      req.body.user.password
    );
    console.log(registeredUser);

    // req.flash("Please login with your credentials"); 
    res.status(200).redirect("/profile");
  } else {
    res.send("Please send user data!");
  }
});

app.get("/register", (req, res) => {
  res.status(200).render("register.ejs");
});

app.get("/", (req, res) => {
  res.status(200).render("home.ejs");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}....`);
  connectDB();
});

// registeration of user
