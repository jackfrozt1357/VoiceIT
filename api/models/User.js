const mongoose = require('mongoose');

const Userschema = mongoose.Schema({
    email : {
        type : String,
        required :true
    },
    password :{
        type :String,
        required :true
    },
  
    reviews :[{
        type : mongoose.Schema.Types.ObjectId
    }],
    fname :{
        type :String,
        required : true
    },
    lname :{
        type :String,
        required : true
    }
});



module.exports =mongoose.model('User',Userschema);