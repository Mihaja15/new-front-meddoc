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

//new method
router.post('/fichier', async function (request, response) {
    let nameFinal = 'fichier_'+(Math.random()*100000000)+'_';
    const storagevv2 = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/assets/upload/')
        },
        filename: function (req, file, cb) {
            let name = nameFinal+file.originalname;
            console.log('name = '+name);
            cb(null,""+name);
        }
    });
    var uploadV2 = multer({storage: storagevv2});

    const result = await new Promise(function (resolve) {
      try {
        uploadV2.any('files')(request, response, function(err) {
            const data = { valeur : 'ca marche', etat : 500}
          resolve(data);
        });
      } catch (error) {
        console.log(error);
        resolve(undefined);
      }
    });
    if (!result) {
      response.status(500).json({'status': false, 'message': 'Il y a une erreur', 'code': ''});
      return;
    }
    response.status(200).json({'status': true, 'message': 'Upload fichier avec succés', 'code': nameFinal});
  });










module.exports = router;