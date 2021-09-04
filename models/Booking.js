const mongoose = require('mongoose');
const {objectId} = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
    bookingStartDate:{
        type:Date,
        required:true,
    },
    bookingEndDate:{
        type:Date,
        required:true,
    },
    itemId:[{
        _id:{
            type:objectId,
            ref:'Item',
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        night:{
            type:Number,
            required:true,
        },
    }],
    memberId:[{
        type: objectId,
        ref:"Member",
    }],
    bankId:[{
        type: objectId,
        ref:"Bank",
    }],
    proofPayment:{
        type:String,
        required:true,
    },
    bankFrom:{
        type:String,
        required:true,
    },
    accountHolder:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
})

module.exports = mongoose.model('Booking', bookingSchema);