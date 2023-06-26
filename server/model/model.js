const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        unique: false
    },
    img : {
        type: String,
        required: true,
        
    },
    type : String,
    price : String
})

const Productdb = mongoose.model('productdb', schema);

module.exports = Productdb;