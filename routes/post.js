const express = require("express");
const{ getAllBlogs, getAllNotices, 
    getAllInterviewExperience, getUpvoteBlog, 
    getSinglePost, deletePost, 
    searchPost, getId } = require('../controllers/postController');
    
const router = express.Router();
const isAuth = require("../middlewares/isAuth")

router.get("/singlePost/:id", isAuth, getSinglePost)

router.get("/deletePost/:id", isAuth, deletePost);

router.get("/searchPost", searchPost); // currently not working

router.post("/getId", getId);

router.get("/blog/vote/:id/:isUpvote", isAuth, getUpvoteBlog)

router.get("/blogs", getAllBlogs);

router.get("/notices", getAllNotices);

router.get("/interviews", getAllInterviewExperience);

module.exports = router;
