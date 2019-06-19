const express = require('express');
const router = express.Router();
const pe = require('./Errors');
const Review = require('../models/Review');
const Uni = require('../models/University');
const passport = require('passport');
require('../../config/passport')(passport);


//review university
//like review
//unlike review
//check review for a uni
//delete review
router.post('/:uniid',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(!req.body.comment|| !req.params.uniid)
    {
        res.json({success : 'false',Error:"Review is empty"});
    }else{
        Uni.findById({_id:req.params.uniid},(err,data)=>{
            if(err)
            {
                res.json({success : 'false',Error:pe.Unknown+" University does not exist"});
            }
            else{
                if(data)
                {
                    
                    //save user name an d comment
                    var newreview = new Review(
                        {
                            comment : req.body.comment,
                            user :req.user.id,
                            university : req.params.uniid

                        }
                    );
                    newreview.save()
                        .then((final)=>{res.json({success:"true",comment:final.comment,_id:comment._id
                    
                    })})
                        .catch((err)=>res.status(401).json({success : 'false',Error:pe.Unknown}));
                     
                }
                else
                {
                    res.json({success : 'false',Error:"University does not exist"});
                }
            }
        });
      
           
    }
    
});
//like a review

router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(!req.params.id)
    {
        res.json({Error:"ID not present"});
    }else{
        Review.findOne({_id:req.params.id},(err,reply)=>{
            if(err)
            {
                res.json({Error:pe.Unknown});
            }
            else
            {
                Review.findById(req.params.id)
                    .then((review)=>{
                        if(review.likes.filter(like=>like===req.user.id).length>0)
                        {
                            res.status(401).json({Error:"You already liked"})
                        }
                        else{
                            review.likes.unshift({user:req.user.id});
                            review.save().then(re=>res.json(re))
                        }
                    })
                    .catch(err=>res.status(401).json({Error:pe.Unknown}));
            }
        });
    }

});

//unlike a review
router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>
{
    res.json({Errr:"to be continued"});



});

module.exports=router;