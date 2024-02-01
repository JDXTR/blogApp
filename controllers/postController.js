const Post = require("../model/post");

// exports.getUpvoteBlog = async (req, res) => {
//     try {
//         const blogId = req.params.id;
//         const isUpvote = req.params.isUpvote;
//         const user = res.locals.user;

//         const userID = user._id.toString();

//         if (isUpvote === "1") {
//             const updatedBlog= await Post.findByIdAndUpdate(blogId,{
//                 $addToSet: {
//                     upvoteLists: userID,
//                 },
//             });

//             let data = await JSON.stringify({ upvote: updatedBlog.upvoteLists.length });

//             res.send(data);
//         }
//     } catch (err) {
//         console.log(err)
//     }
// }

exports.getUpvoteBlog = async (req, res) => {
    const blogId = req.params.id;
    const isUpvote = req.params.isUpvote;
    const userId = req.session.user._id._id.toString();
    try {
        const post = await Post.findById(blogId);
        let alreadyUpVoted = false;
        if (isUpvote == 1) {
            post.upvoteLists.map( id => {
                if (userId === id) {
                    alreadyUpVoted = true;
                }
            })

            let updatedUpVotedList = post.upvoteLists.filter(id => userId !== id);

            if (!alreadyUpVoted) updatedUpVotedList.push(userId);

            post.upvoteLists = updatedUpVotedList;
            const updatedPost = await post.save();
            let data = await JSON.stringify({ upvote: updatedPost.upvoteLists.length });
            res.send(data);
        }
    }
    catch (err) {
        console.log(err);
    }
}

exports.getSinglePost = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Post.findById(id);
        console.log(typeof (data.date));
        res.render("singlePost", { data: data });
    } catch (err) {
        console.log(err)
    }
};

exports.deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        Post.findByIdAndRemove(id, (err, doc) => {
            if (!err) {
                res.redirect('/profile');
            } else {
                console.log('Failed to delete');
            }
        })
    } catch (err) {
        console.log(err);
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Post.find({ type: 'Blog' });
        res.render("blog.ejs", { blogs });
    } catch (err) {
        console.log(err);
    }
};

exports.getAllNotices = async (req, res) => {
    try {
        const notices = await Post.find({ type: 'Notice' });
        res.render("notice.ejs", { notices });
    } catch (err) {
        console.log(err);
    }
};

exports.getAllInterviewExperience = async (req, res) => {
    try {
        const interviews = await Post.find({ type: 'Interview' });
        res.render("interview.ejs", { interviews });
    } catch (err) {
        console.log(err);
    }
};

exports.searchPost = async (req, res) => {
    const value = req.query.value;
    const data = await Post.find({
        title: { $regex: value, $options: "$i" }
    }, { _id: 1, title: 1 }).limit(5);
    res.send(data);
};

exports.getId = async (req, res) => {
    console.log(req.body);
}