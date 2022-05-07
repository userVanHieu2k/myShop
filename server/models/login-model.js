const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Login = new Schema({
    username: { type: String},
    password: { type: String },
    rule: { type: Number },
    firstname: { type: String },
    lastname: { type: String },
    phone: { type: String },
    accessToken: { type: String, required: true },
    resetToken: { token: { type: String }, expires: { type: String }, required: false }
},
    { timestamps: true },
)

module.exports = mongoose.model('login', Login)