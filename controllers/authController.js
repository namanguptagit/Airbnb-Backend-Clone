exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
  });
};
exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
};
exports.getLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};