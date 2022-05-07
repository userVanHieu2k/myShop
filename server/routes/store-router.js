const express = require('express')

const Store = require('../controllers/store-ctrl')

const router = express.Router()

router.post('/create-store/:userId', Store.CreateStore)
router.get('/get-store/:userId', Store.getStore)
router.delete('/delete-store/:id', Store.deleteStore)
router.post('/delete-product-store', Store.deleteProductStore)
module.exports = router