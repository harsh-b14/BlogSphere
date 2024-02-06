const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require("body-parser");

const Blog = require("../models/blogs");
// const Comment = require("../models/comment");

const router = Router();
router.use(bodyParser.urlencoded({extended: true}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./public/uploads/${req.user._id}'));
    },
    filename: function (req, file, cb) {
      const fileName = '${Date.now()}-${file.originalName}';
      cb(null, fileName)
    }
});

const upload = multer({ storage: storage });

router.get("/add-blog", upload.single('coverImage'), (req, res) => {
    return res.render('addBlog', {
        user: req.user,
    })
})

router.post("/", (req, res) => {
    // const { coverImage, }
    console.log(req.body.coverImage);
    console.log(req.body);
    return res.redirect("/");
})

module.exports = router;