const Post = require("../model/post");
const User = require("../model/user");

exports.getInputForm = (req, res) => {
    res.render("create-post.ejs");
}

exports.createPost = async (req, res) => {
    const username = res.locals.username;
    const user = res.locals.user;
    let {content, title, type} = req.body;

    let hashTags = content.split(" ").filter(st => st.startsWith("#"));
    console.log(hashTags);

    // let arr = content.split(" ");
    // for(let i= 0; i<arr.length;i++){
    //     if(arr[i][0] == "#"){
    //         hashTags.push(arr[i]);
    //     }
    // }

    try {
        const post = await Post.create({
            title: title,
            content: content,
            type: type,
            author: username,
            date: new Date(),
            upvote: 0,
            hashTags: hashTags,
            upvoteLists : []
        })

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                $addToSet: {
                    posts: post._id,
                },
            }
        )
        res.render("home.ejs");
    } catch (err) {
        console.log(err)
    }
}
