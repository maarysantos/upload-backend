const dotenv = require('dotenv').config();

const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

var AWS = require('ibm-cos-sdk');


module.exports ={
    //pasta destino do arquivo
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage:new AWS.S3(crdntials,
        ),
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