const express = require('express')

const Loginctrl = require('../controllers/login-ctrl')

const router = express.Router()
router.get('/search-account/:search', Loginctrl.searchAccount)
router.post('/login', Loginctrl.CreateLogin)
router.get('/get-profile/:userId', Loginctrl.getProfile)
router.put('/update-profile', Loginctrl.updateProfile)
router.post('/register', Loginctrl.Register)
router.post('/forgot', Loginctrl.ForgotPassword)
router.delete('/delete-account/:id', Loginctrl.deleteAccount)
router.get('/get-account', Loginctrl.getAccount)
router.post('/create-account', Loginctrl.createAccount)
router.put('/edit-account', Loginctrl.editAccount)
router.put('/update-account', Loginctrl.updateAccount)
router.put('/change-password', Loginctrl.changePassword)
module.exports = router
