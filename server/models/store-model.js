const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Store = new Schema({
    _id: { type: String, required: true },
    store: [{
        _id: { type: String, required: true },
        nameproduct: { type: String, required: true },
        price_sale: { type: Number, required: true },
        image: { type: String, required: true },
        color: { type: String, required: true },
        size: { type: String, required: true },
        total: { type: Number, required: true },
        productId: {}
    }],
})

module.exports = mongoose.model('store', Store)