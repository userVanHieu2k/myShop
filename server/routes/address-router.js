const express = require('express');
const router = express.Router();
const AddressCtrl = require('../controllers/address-ctrl')
router.get('/city', AddressCtrl.getCity);
router.get('/district/:city', AddressCtrl.getDistrict)
router.get('/commune/:district', AddressCtrl.getCommune)
module.exports = router;