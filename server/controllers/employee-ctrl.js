const Employee = require("../models/employee-model");

getEmployee = async(req,res) =>{
  await Employee.find({}, (err, employee) => {
      if(err){ 
          return res.status(400).json({status: 'ERROR', message: err});
      }
      if(!employee || employee.length < 1){
          return res.status(200).json({status: 'SUCCESS', message: 'Employee not found', data: []})
      }
      return res.status(200).json({status: 'SUCCESS', message: 'Success', data: employee})
  })
}
createEmployee = async(req,res) =>{
  const body = req.body;
  if(!body){
      return res.status(400).json({status: 'ERROR',message: 'Body not found'})
  }
  const employee = new Employee(body);
 await employee.save()
    .then(()=> {
        return res.status(200).json({status: 'SUCCESS', message: 'Add member success'})
    })
    .catch(err => {
        return res.status(400).json({status: 'ERROR', message: err});
    })
}
updateEmployee = async(req,res) =>{
   const body = req.body;
   if(!body){
       return res.status(400).json({status: 'ERROR',message: 'Body not found'});
   }
   await Employee.findByIdAndUpdate({_id: body._id}, body, (err, result)=> {
       if(err){
           return res.status(400).json({status: 'ERROR', message: err});
       }
       if(!result || result.length < 1){
           return res.status(200).json({status: 'SUCCESS', data: []})
       }
       return res.status(200).json({status: 'SUCCESS', message: 'update employee success'})
   })
}
deleteEmployee = async(req,res) =>{
  const id = req.params.id;
  if(!id){
      return res.status(400).json({status: 'ERROR', message: 'Id not found'});
  }

  await Employee.findByIdAndDelete({_id: id}, (err, result) => {
      if(err){ 
          return res.status(400).json({status: 'ERROR', message: err});
      }

    //   if(!result){
    //       return res.status(200).json({status: 'ERROR', message: 'Cant not delete employee with id request'});
    //   }
      return res.status(200).json({status: 'SUCCESS', message: 'Delete employee success'});
  })
}

searchEmployee= async(req, res) => {
    const keySearch = req.params.search;
    let results = [];
    if(!keySearch){
        return res.status(400).json({status: 'SUCCESS', message: 'Key search is not found'});
    }
    await Employee.find({}, (err, result) => {
        if(err){
            return res.status(400).json({status: 'ERROR', message: err});
        }
        if(!result){
            return res.status(200).json({status: 'ERROR', message: 'Not record employee', data: []});
        }
        if(result){
            result?.forEach((el) => {
              if (
                el.name.toLowerCase().includes(keySearch.toLowerCase()) ===
                true
              ) {
                results.push(el);
              }
            });
            if (results.length > 0) {
              return res
                .status(200)
                .json({ status: "SUCCESS", message: "Search Success", data: results });
            }
            if (!results.length)
              res
                .status(200)
                .json({
                  status: "ERROR",
                  message: "No result search",
                  errorCode: "ERROR.SEARCH.NOT.FOUND",
                  data: [],
                });
          }
    })
} 

module.exports = {getEmployee,createEmployee, updateEmployee, deleteEmployee, searchEmployee}