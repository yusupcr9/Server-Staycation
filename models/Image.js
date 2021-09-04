const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
        required:[true, "Image Url Tidak Boleh Kosong!"]
    }
})

module.exports = mongoose.model('Image', imageSchema);