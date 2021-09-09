const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Nama Tidak Boleh Kosong!"]
    },
    itemId : [{
        type:ObjectId,
        ref:'Item',
    }]
})

module.exports = mongoose.model('Category', categorySchema);