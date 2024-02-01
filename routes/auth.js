const express = require("express");
const router = express.Router();

const { getLogin, getSignUp, postSignUp, postLogin, logout } = require("../controllers/authController")

const isNotAuth = require("../middlewares/isNotAuth")
const isAuth = require("../middlewares/isAuth")

router.get("/login", isNotAuth, getLogin); 
router.get("/signup", isNotAuth, getSignUp);
router.post("/signup", isNotAuth, postSignUp);
router.post("/login", isNotAuth, postLogin);
router.get("/logout", isAuth, logout);

module.exports = router;
