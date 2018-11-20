const mongoose = require('mongoose');

const FavSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    league: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lego'
    },

    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team'
    }],



    creationDate: {
        type: Date,
        default: new Date
    }

});

module.exports = mongoose.model('fav', FavSchema);