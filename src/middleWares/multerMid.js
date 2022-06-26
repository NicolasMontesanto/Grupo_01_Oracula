let path = require('path');
// multer
let multer = require('multer');

//Guardado de archivos de multer
const storage = multer.diskStorage({

    //ubicacion
    destination:  (req, file, cb) => {
      cb(null, './public/img/productos')
    },
    //nombre del archivo
    filename:  (req, file, cb) => {
      const fileName = `${Date.now()}-prodImg${path.extname(file.originalname)}`
      cb(null, fileName);
    }
  })
  
  const upload = multer({ storage })

  module.exports = upload;