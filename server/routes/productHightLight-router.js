const express = require('express');

const ProductHightLight = require("../controllers/productHightLight-ctrl");
const router = express.Router();

router.get('/get-product-hightlight', ProductHightLight.getProductHightLight);
router.post('/create-product-hightlight', ProductHightLight.CreateProductHightLight);
router.put('/update-product-hightlight', ProductHightLight.UpdateProductHightLight);

module.exports = router;