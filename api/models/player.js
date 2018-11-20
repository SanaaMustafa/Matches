const mongoose = require('mongoose');
const playerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team'
    }
})
module.exports = mongoose.model('player', playerSchema);