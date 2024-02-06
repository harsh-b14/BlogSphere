const express = require('express');
const path = require('path');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const { auth } = require('./middleware/authentication');
const blogRoutes = require('./routes/blog');

const app = express();
const PORT = 8000;

mongoose.connect("mongodb://127.0.0.1/blogsphere")
    .then((e) => console.log("MongoDB connected"));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(auth('tokenCookie'));

app.get("/", (req, res) => {
    res.render("home", {
        user: req.user,
    });
});

app.use('/user', userRoutes);

app.use('/blog', blogRoutes);

app.listen(PORT, () => {
    console.log("App running on port " + PORT);
});