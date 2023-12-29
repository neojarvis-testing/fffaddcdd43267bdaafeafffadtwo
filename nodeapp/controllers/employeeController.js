const Employee = require('../models/employeeModel');

// Get all Employee Details
const getAllEmployees = async (req, res) => {
  try {
    const sortValue = req.body.sortValue || 1;
    const search = req.body.searchValue || '';
    
    const searchRegex = new RegExp(search, 'i');
    const employees = await Employee.find({firstName : searchRegex})
    .sort({experience : parseInt(sortValue)});
    console.log("employees",employees);
    res.status(200).json({"data":employees});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

// Get a particular Employee Details
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id, { _id: 0, __v: 0 });
    if(!employee){
      return res.status(404).json({"message" : "Employee not found"})
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
    }
};
// db.employees.dropIndex("mailId_1")
//db.employees.createIndex({ mailId: 1 }, { unique: true })

// Employee Registration
const registerEmployee = async (req, res) => {
  try {
   await Employee.create(req.body);
   res.status(200).json({ message: 'Employee registration successful'});

  } catch (error) {
    res.status(500).json({ message: error.message });
}
};

// Edit Employee Details
const editEmployee = async (req, res) => {
  try {
    const {id} = req.params;
    const updateemployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    if(!updateemployee){
        return res.status(404).json({"message" : "Employee not found"}); 
    }
    res.status(200).json({ message: 'Employee details updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Employee Details
const deleteEmployee = async (req, res) => {
  try {
    const {id} = req.params;
    const deleteemployee = await Employee.findByIdAndDelete(id);
    if(!deleteemployee){
        return res.status(404).json({"message" : "Employee not found"}); 
    }
    res.status(200).json({ message: 'Employee details deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Bad request' });
  }
};

const getEmployeeByUserId = async (req, res) => {
  try 
  {
    const sortValue = req.body.sortValue || 1;
    const search = req.body.searchValue || '';
    const searchRegex = new RegExp(search, 'i');
    const { userId } = req.body;
    const employee = await Employee.find({userId, firstName : searchRegex})
    .sort({experience : parseInt(sortValue)});
 
    res.status(200).json(employee);
  } catch (error) {
    console.log("the reason is",error);

    res.status(500).json({ message: error.message});
  }
  };

module.exports = {
  getAllEmployees,
  getEmployeeById,
  registerEmployee,
  editEmployee,
  deleteEmployee,
  getEmployeeByUserId
};