const dotenv = require('dotenv').config();

const multer = require('multer');
const multerS3 = require('multer-s3');
var AWS = require('ibm-cos-sdk');

const path = require('path');
const crypto = require('crypto');


const storageTypes = {
    local: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
      },
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
          if (err) cb(err);
  
          file.key = `${hash.toString("hex")}-${file.originalname}`;
  
          cb(null, file.key);
        });
      }
    }),
    s3: multerS3({
        s3: new AWS.S3({
          endpoint: 'https://control.cloud-object-storage.cloud.ibm.com/v2/endpoints',
    apiKeyId: 'g1_Lav4bQ4YlBo1SQss8uicTJrjxD6BCFnACjrF0rwrp',
    serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/bd3c816e4f3b4aa28684a213275de481:2e7b5330-1eb7-493f-b646-b5f9fb5d4e25::',
          cos_hmac_keys: {
            access_key_id: "b8311fb7780d4060ba88de67e50c0479",
            secret_access_key: "68e094f4c4d9ae17ac38d107bd5a6893524d3bbc0b2a2668"
          },
        }),
        bucket: process.env.BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, cb) => {
          crypto.randomBytes(16, (err, hash) => {
            if (err) cb(err);
    
            const fileName = `${hash.toString("hex")}-${file.originalname}`;
    
            cb(null, fileName);
          });
        }
      })
    }
module.exports ={
    //pasta destino do arquivo
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: storageTypes[process.env.STORAGE_TYPE],
          
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