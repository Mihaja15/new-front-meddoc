const path = require('path');
const express = require('express');
const multer  = require('multer');
const fs = require('fs');

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
router.use(express.urlencoded(
  {extended:true}
));
router.use(express.json());
// Upload Image
router.post("/photo", upload.single('photo'), (req, res, next) => {
    console.log(req);
    console.log(res);
    return res.json({
        image: req.file.path
    });
});

router.post('/deleteFichier', async function (request, response) {
    try {
      if(request.body.name!== undefined){
        fs.unlinkSync('./public/uploads/'+request.body.name);
        response.status(200).json({'status': true, 'message': 'suppresion fichier avec succés'});
      }
      //file removed
    } catch(err) {
      response.status(500).json({'status': false, 'message': ''+err, 'code': ''});
    }
})

router.post('/download', async function(req, res){
    try {
      if(req.body.name!== undefined){
        
        /*var file = fs.readFileSync(__dirname + '/public/uploads/'+req.body.name, 'binary');
        res.setHeader('Content-Length', file.length);
        res.write(file, 'binary');
        res.end();*/
        
        /*var file = __dirname + '/public/uploads/'+req.body.name;
        res.download(file);*/
        var file = __dirname + '/public/uploads/'+req.body.name;
        res.download(''+file, function(error){
            console.log("Error : ", error);
            res.status(500).json({'status': false, 'message': ''+error, 'code': ''});
        });
        res.status(200).json({'status': true, 'message': 'suppresion fichier avec succés'});
      }
      //file removed
    } catch(err) {
      console.log(err);
      res.status(500).json({'status': false, 'message': ''+err, 'code': ''});
    }

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