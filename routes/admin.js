const route=require('express').Router();
const products = require('../db/models').models.products;


const multer=require('multer');

let Storage = multer.diskStorage({
    destination:  './frontend/Images',
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
let upload = multer({ storage: Storage });


route.get('/', (req, res) => {
    products.findAll({})
        .then((products) => res.send(products))
        .catch((err) => console.error(err))
});

route.post('/',upload.single('imgUploader'), (req, res) => {
    products.create({
        img:req.file.filename,
        name: req.body.name,
        price:req.body.price
    })
        .then((result) => res.redirect('http://localhost:5656/admin'))
        .catch((err) => console.error(err))
});
route.post('/:id', (req, res) => {
    if (isNaN(parseInt(req.params.id))) {
        return res.status(404).send({
            message: "Product not found"
        })
    }
    products.destroy({where:{id:req.params.id}})
        .then(()=> res.redirect('http://localhost:5656/admin'))
        .catch(err => console.error(err))
});
exports.route = route;