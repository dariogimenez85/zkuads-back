const router = require("express").Router();
const passport = require("passport");

const { loginSecuence } = require('../secuences/users');

router.get("/login/success", (req, res) => {
  if (req.user) {
    loginSecuence.execute({
      request: req,
      resolve: res,
      externalId: req.user?.id || null
    });
  } else {
    res.status(401).send({ loggedIn: false, err: 'User not logged in' });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

//Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

//Facbook
// router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));
// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: process.env.CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

module.exports = router