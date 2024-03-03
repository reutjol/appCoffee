const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MilkSchema = new Schema({
    type:{
        type:String,
        default:"none"
    },
    price:{
        type:Number,
        default:0
    }
})

module.exports = Milk = mongoose.model('Milk',MilkSchema);
