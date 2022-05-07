const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employee = new Schema({
    name: { type: String, required: true},
    date_birth: { type: String , required: true},
    home_town: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: Number, required: true },
    phone: { type: String, required: true },
    date_join: { type: String, required: true },
    rate: { type: String, required: true }
},
    { timestamps: true },
)

module.exports = mongoose.model('employees', Employee)