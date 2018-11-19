module.exports=function ConnectMongoDB(){
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://admin:admin123@ds211774.mlab.com:11774/matches')
}

