const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notify = new Schema({
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
},
{timestamps: true}

)

module.exports = mongoose.model('notifys', Notify);