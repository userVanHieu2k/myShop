const Notify = require('../models/notify-model');

getNotify = (req,res) => {
    Notify.find({}, (err, notify) =>{
        if(err){
            return  res.status(400).json({status: 'ERROR', message: err});
        }
        if(!notify || notify.length < 1){
            return res.status(400).json({status: 'ERROR', message: 'Notify not found'})
        }
        return res.status(200).json({status: 'SUCCESS', message: 'Success', data: notify})
    })
}

module.exports = {getNotify}