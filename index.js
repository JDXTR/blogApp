require('dotenv').config(); // to access .env file
const express = require("express"); // to create server
const app = express(); // to create express app
const path = require("path"); // to access current directory path
const bodyParser = require("body-parser"); // to parse body sent by POST request
const mongoose = require('mongoose'); // mongodb
const session = require("express-session") // used to store authentication status
const MongoDBStore = require("connect-mongodb-session")(session); // to store express sesssion to mongodb
const {flash} = require("express-flash-message") // to display pop up message
const csrf = require("csurf"); // used for authentication

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const createRoutes = require("./routes/create");
const searchRoutes = require("./routes/search");
const profileRoutes = require("./routes/profile")

const MONGODB_URI = process.env.DATABASE;

const store = new MongoDBStore({uri: MONGODB_URI, collection: 'sessions'}) // storing sessions in mongodb

let csrfProtection = csrf() // csrf token generation

app.set("view engine", "ejs"); // ejs templeting is used
app.use(bodyParser.urlencoded({extended: false})); // bodyParser configured
app.use(express.static(path.join(__dirname, "public"))); // all static files are in public dir
// ./COLLEGEAPP-MAIN/public
app.use(session({secret: "my secret", resave: false, saveUninitialized: false, store: store}));
app.use(flash({sessionKeyName: 'flashMessage'}));
app.use(csrfProtection);

// to user logged in status
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.user = req.session.user;
    if (req.session.user)
        res.locals.username = req.session.user.username;
    else
        res.locals.username = null

    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use(authRoutes);
app.use(createRoutes);
app.use(postRoutes);
app.use(profileRoutes);
app.use(searchRoutes);

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/error", (req, res) => {
    res.render("error.ejs", {code: "404"});
});

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('connected to dB');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening in ${PORT}`));
