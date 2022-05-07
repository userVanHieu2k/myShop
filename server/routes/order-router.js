const express = require('express');
const router = express.Router();
const OrderCtrl = require('../controllers/order-ctrl')
router.post('/create-order', OrderCtrl.CreateOrder)
router.get('/get-order/:userId', OrderCtrl.getOrderUser)
router.get('/get-all-order', OrderCtrl.getAllOrder)
router.get('/search-order/:search', OrderCtrl.searchOrder)

router.delete('/delete-order/:id', OrderCtrl.deleteOrder)
router.put('/edit-order', OrderCtrl.editOrder)
router.get('/get-order-month', OrderCtrl.findOrderByMonth)
router.post('/get-order-weekNow', OrderCtrl.getOrderWeekNow)
router.post('/get-order-year', OrderCtrl.getOrderYear)


module.exports = router