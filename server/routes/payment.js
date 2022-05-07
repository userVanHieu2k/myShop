const express = require('express');
const Payment = require('../controllers/payment-ctrl');
const router = express.Router();

router.put('/payment' ,Payment.payPalPayment);

module.exports = router;