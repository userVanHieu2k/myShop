const Order = require('../models/order-model');

payPalPayment = (req,res) => {
  console.log(req.body);
  const body = req.body;
  Order.findByIdAndUpdate({_id: body.orderId}, {status_Order: req.body.statusOrder}, (err, payment) => {
      if(err){
        return res.status(400).json({status: 'ERROR', message: err})
      }
      if(payment){
        return res.status(200).json({status: 'SUCCESS', message: 'Payment Success'})
      }
  })
}

module.exports = {payPalPayment};