const express = require('express');
const employeeController = require('../controllers/employeeController');
const {validateToken} = require('../authUtil');
const router = express.Router();

  // Get all Employee Details
  router.post('/getallemployee',validateToken, employeeController.getAllEmployees);
  
  // Get a particular Employee Details
  router.get('/getemployee/:id',validateToken, employeeController.getEmployeeById);
  
  // Employee Registration
  router.post('/registeremployee',validateToken, employeeController.registerEmployee);
  
  // Edit Employee Details
  router.put('/editemployee/:id',validateToken, employeeController.editEmployee);
  
  // Delete Employee Details
  router.delete('/deleteemployee/:id',validateToken, employeeController.deleteEmployee);

  router.post('/getEmployeeByUserId',validateToken, employeeController.getEmployeeByUserId);

  
module.exports = router;
  