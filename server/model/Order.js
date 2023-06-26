const mongoose = require('mongoose');

var Orderschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    quantity: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    total: {
        type: String,
        required: true
    },
})

const Orderdb = mongoose.model('ordersdb', Orderschema);

module.exports = Orderdb;