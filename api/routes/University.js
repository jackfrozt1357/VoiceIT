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

router.get('/',(req,res)=>{
    Uni.find().then(data=>res.json(data)).catch(err=>console.log(err
        ));
        
});


module.exports = router ;