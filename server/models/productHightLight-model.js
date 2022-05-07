const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HightLight = new Schema({
    // _id: {type: String, required: true},
    // title: {type: String, required: true},
    // description: {type: String, required: true},
    // price: {type: Number, required: true},
    // price_sale: {type: Number, required: false},
    // percent_sale: {type: Number, required: false},
    // image: {type: String, required: true},
    // list_image: {},
    // shoe_type: {type: Number, require: true},
    // color: {type: Array, required: true},
    // size: {type: Array, required: true},
    // createdAt: {type: String, required: true},
    // createdAt: {type: String, required: true},
    // __v: {}
    item: {}

},
)

module.exports = mongoose.model('hightlights', HightLight)