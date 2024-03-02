const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PreferencesSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'items',
        required: true
    }],
    milk: {
        type: Schema.Types.ObjectId,
        ref: 'milk',
        required: true ///////////////
    },
    is_fav:{
        type:Boolean,
        default:"false"
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    size:{
        type:String,
        required:true,
        default:"small"
    }
})

module.exports = Preferences = mongoose.model('preferences', PreferencesSchema);
