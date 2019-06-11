const mongoose = require('mongoose');

const Reviewschema = mongoose.Schema({
    
    university :{
        type :mongoose.Schema.Types.ObjectId,
        ref : 'Uni'

    },
     
    user :{
        type :mongoose.Schema.Types.ObjectId,
        ref : 'Uni'

    },
    comment :[{
        type :String,
        required : true
    }],
    date:{
        type :Date,
        default :Date.now
    }
});



module.exports = mongoose.model('Review',Reviewschema);