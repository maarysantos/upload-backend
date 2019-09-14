const routes = require ('express').Router();
const multer = require('multer');
const multerConfig = require("./config/multer");

routes.get('/', (req, res) => {
    return res.send('ola')
});

routes.post('/', multer(multerConfig).single('file'), (req, res) => {
    return res.send(req.file);
});

module.exports = routes;
