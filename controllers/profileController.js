const Post = require("../model/post");

exports.getProfile = async (req, res) => {
    const username = res.locals.username;
    let posts = await Post.find({author: username});
    res.render("profile.ejs", { posts });
}
