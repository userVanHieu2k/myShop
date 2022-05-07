const express = require('express')

const Product = require('../controllers/product-ctrl')

const router = express.Router()

router.post('/create-product', Product.CreateProduct)
router.get('/get-product',Product.GetProduct)
router.get('/product-detail/:id',Product.GetProductDetail)
router.get('/product/:page', Product.GetProductPage)
router.put('/edit-product/:id', Product.EditProduct)
router.delete('/delete-product/:id', Product.DeleteProduct)
router.get('/search-product/:search',Product.SearchProduct)
router.get('/filter-product/:type', Product.FilterProduct);
router.get('/filter-product-price/:type', Product.FilterProductWithPrice);
router.put('/apart-from-product', Product.ApartFromNumberProduct);
router.put('/add-number-product', Product.AddNumberProduct);

module.exports = router