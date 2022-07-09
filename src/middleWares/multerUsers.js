let path = require('path');
let multer = require('multer');

const storage = multer.diskStorage({

    destination:  (req, file, cb) => {
      cb(null, './public/img/Profile-pictures')
    },
    filename:  (req, file, cb) => {
      const fileName = `${Date.now()}-profileImg${path.extname(file.originalname)}`
      cb(null, fileName);
    }
  })
  
  const upload = multer({ storage })

  module.exports = upload;