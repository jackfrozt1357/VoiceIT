const mongoose = require('mongoose');

const Unischema = mongoose.Schema({
    name:{
        type :String,
        required : true
    },
    Ranking :{
        type : Number,
        default : 10
    },
    Logo :{
        type : String

    }
    

});



module.exports = mongoose.model('Uni',Unischema);