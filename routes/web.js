const path = require('path');
const express = require('express');
const multer  = require('multer');

const date = new Date();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets/upload/')
    },
    filename: function (req, file, cb) {
        cb(null,''+file.originalname)
    }
});

var upload = multer({storage: storage})

const router = express.Router();

// Upload Image
router.post("/photo", upload.single('photo'), (req, res, next) => {
    console.log(req);
    console.log(res);
    return res.json({
        image: req.file.path
    });
});


module.exports = router;