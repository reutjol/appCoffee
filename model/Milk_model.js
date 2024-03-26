const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MilkSchema = new Schema({
    type:{
        type:String,
        required:true,
        default:"none"
    },
    price:{
        type:Number,
        default:0
    }
})

module.exports = Milk = mongoose.model('milk',MilkSchema);
