const mongoose = require('mongoose');

const MatchSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    league: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lego'
    },

    img: { // url 
        type: String,
    },
    time: {
        type: String
    },
    date: {
        type: String
    },
    team1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team'
    },
    team2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team'
    },


    creationDate: {
        type: Date,
        default: new Date
    }

});

module.exports = mongoose.model('match', MatchSchema);