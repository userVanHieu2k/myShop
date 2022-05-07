const express = require('express');
const router = express.Router();
const NotifyCtrl = require('../controllers/notify-ctrl');
router.get('/notify', NotifyCtrl.getNotify);

module.exports = router;