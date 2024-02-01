const express = require("express");
const { getProfile } = require("../controllers/profileController");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();

router.get("/profile", isAuth, getProfile);

module.exports = router;
