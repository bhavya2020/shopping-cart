const route=require('express').Router();
const products = require('../db/models').models.products;

route.get('/', (req, res) => {
    products.findAll({})
        .then((products) => res.send(products))
        .catch((err) => console.error(err))
});
route.post('/:id', (req, res) => {
    if (isNaN(parseInt(req.params.id))) {
        return res.status(404).send({
            message: "Product not found"
        })
    }
    products.findAll({where:{id:req.params.id}})
        .then((product) => res.send(product))
        .catch(err => console.error(err))
});
exports.route = route;