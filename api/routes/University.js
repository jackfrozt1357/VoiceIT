const express = require('express');
const router = express.Router();
const Uni = require('../models/University');

//this route is adevelopemt route  not avalible to all it is used for prod.
router.post('/',(req,res)=>
{
   var NewUni = new Uni({
       name : req.body.name
   })
   NewUni.save()
    .then((result)=>{
        res.status(200).json({
            result
        })
    })
    .catch(err=>{
        res.json({Error:err});
    });
});

router.get('/_id',(req,res)=>{
    Uni.find({_id:req.params._id})
        .then((data)=>
        {
            res.json(data);
        })
        
});


module.exports = router ;


//check out spcific uni
//get list of like 20 unis based on rank
//rank i.e give points
//down vote and upvote if possible
