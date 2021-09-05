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
        cb(null,''+file.filename)
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
    //console.log(req.body.file);
    //console.log(res);
    return res.json({
        image: req.file.path
    });
});

router.post('/deleteFichier', async function (request, response) {
    try {
      if(request.body.files!== undefined){
        for(let i=0;i<request.body.files.length;i++)
          fs.unlinkSync('./public/assets/upload/'+request.body.files[i]);
        response.status(200).json({'status': true, 'message': 'suppresion fichier avec succés'});
        //console.log('suppresion fichier avec succés')
      }
      //file removed
    } catch(err) {
      //console.log(err)
      response.status(500).json({'status': false, 'message': ''+err, 'code': ''});
    }
})

router.post('/download', async function(req, res){
    try {
      if(req.body.name!== undefined){
        var file = __dirname + '/public/uploads/'+req.body.name;
        res.download(''+file, function(error){
            //console.log("Error : ", error);
            res.status(500).json({'status': false, 'message': ''+error, 'code': ''});
        });
        res.status(200).json({'status': true, 'message': 'suppresion fichier avec succés'});
      }
      //file removed
    } catch(err) {
      //console.log(err);
      res.status(500).json({'status': false, 'message': ''+err, 'code': ''});
    }

});

//new method
router.post('/fichier', async function (request, response) {
  let nameFinal = [];
  var increment = 1;
  const storagevv2 = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, './public/assets/upload/')
      },
      filename: function (req, file, cb) {
          if(file.fieldname==='filesUpload'&&req.body.uuid!==undefined){
            let name = increment+('_'+req.body.uuid)+('_'+date.getTime())+path.extname(file.originalname);
            nameFinal.push(name);
            increment++;
            cb(null,""+name);
          }
      }
  });
  var uploadV2 = multer({storage: storagevv2});
  try {
    uploadV2.any('filesUpload')(request, response, function(err) {
      if(err) {
        //console.log(err);
        response.status(500).json({'status':false,'message': 'Il y a une erreur', 'code': ''});
        return;
      }
      let data = [];
      let indice = 0;
      for (let i = 0; i < request.files.length; i++) {
        if(!request.files[i].filename.includes('undefined')){
          data[indice] = {
            'filename': request.files[i].filename,
            'resType': request.files[i].mimetype
          };
          indice++;
        }
      }
      //console.log(data);
      response.status(200).json({'status':true,'message': 'Upload fichier avec succès', 'code': nameFinal});
      return;
    });
  } catch (error) {
    //console.log(error);
    response.status(500).json({'status':false,'message': 'Il y a une erreur', 'code': ''});
    return;
  }
});
module.exports = router;