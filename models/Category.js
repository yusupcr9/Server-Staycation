const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Nama Tidak Boleh Kosong!"]
    }
})

module.exports = mongoose.model('Category', categorySchema);