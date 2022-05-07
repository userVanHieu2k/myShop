const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
  idUser: {type: String, required: true},  
  infor: {
      name: {type: String, required: true},
      phone: {type: Number, required: true},
      email: {type: String, required: true},
      city: {type: String, required: true},
      district: {type: String, required: true},
      commune: {type: String, required: true},
      address: {type: String, required: true}
  },
  product: {
      sum_price: {type: Number, required: true},
      store: {type: Array,required: true}
  },
  status: {type: Number},
  status_Order: {type: Number},
  create : {
    date: {type: Number},
    month: {type: Number},
    year: {type: Number},
    week: {type: Number}
  }
},
{timestamps: true}

)

module.exports = mongoose.model('orders', Order);