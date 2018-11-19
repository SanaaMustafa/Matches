const mongoose = require('mongoose');

const leagueSchema = mongoose.Schema({


    name: {
        type: String,
        required: true
    },

    img: { // url 
        type: String,
        default: "https://icon-icons.com/icons2/582/PNG/512/worker_icon-icons.com_55029.png"
    },

    from: {
        type: String
    },
    to: {
        type: String
    },


    creationDate: {
        type: Date,
        default: new Date
    }

});

module.exports = mongoose.model('lego', leagueSchema);