const mongoose = require('mongoose');
const {objectId} = mongoose.Schema;

const itemSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    country:{
        type:String,
        default:'Indonesia',
    },
    city:{
        type:String,
        required:true,
    },
    isPopular:{
        type:Boolean,
    },
    description:{
        type:String,
        required:true,
    },
    imageId:[{
        type:objectId,
        ref:'Image',
    }],
    featureId:[{
        type:objectId,
        ref:'Feature',
    }],
    activityId:[{
        type:objectId,
        ref:'Activity',
    }],
})

module.exports = mongoose.model('Item', itemSchema);