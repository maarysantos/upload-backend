const routes = require ('express').Router();
const multer = require('multer');
const multerConfig = require("./config/multer");

const Post = require('./models/Post');

routes.get('/', (req, res) => {
    return res.send('ola')
});

routes.post('/', multer(multerConfig).single('file'), async (req, res) => {
    const { originalname:name,
         size,
         key,
        }= req.file;
    
    const post = await Post.create({
        name,
        size,
        key,
        url:'',


    })
    return res.send(post);
});

module.exports = routes;
