const express = require('express')

const EmployeeCtrl = require('../controllers/employee-ctrl');

const router = express.Router()
router.get('/get-employee', EmployeeCtrl.getEmployee)
router.post('/add-employee', EmployeeCtrl.createEmployee)
router.put('/update-employee', EmployeeCtrl.updateEmployee)
router.delete('/delete-employee/:id', EmployeeCtrl.deleteEmployee)
router.get('/search-employee/:search', EmployeeCtrl.searchEmployee)
module.exports = router
