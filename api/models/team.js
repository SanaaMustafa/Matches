const mongoose = require('mongoose');
const teamSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    img :{
        type : String,
        required : true
    },
    league : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'lego'
    },
    creationDate :{
        type : Date,
        default : new Date
    }
})

module.exports = mongoose.model('team', teamSchema);