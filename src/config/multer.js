const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports ={
    //pasta destino do arquivo
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
          },
          filename: (req, file, cb) => {
              crypto.randomBytes(16, (err, hash)=>{
                  if(err) cb(err);

                  const fileName = `${hash.toString("hex")}-${file.originalname}`;
                  cb(null, fileName);
              })
      
            }
    }),
    //limites de arquivos, quantidade e tamanho do arquivo
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    //filtrar uploads de arquivos, tipos de arquivos q nao quero q seja feita uploads
    fileFilter: (req, file, cb) =>{
        const allowedMimes =[
            "image/jpeg",
            "image/jpg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
          } else {
            cb(new Error("Invalid file type."));
          }
    }

}