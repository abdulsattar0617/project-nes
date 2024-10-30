const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Please login with your credentials");

    return res.redirect("/login");
  } else next();
};

module.exports = isLoggedIn; 