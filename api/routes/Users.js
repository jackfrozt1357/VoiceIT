const express = require('express');
const router = express.Router();
const isemail = require('../middleware/isemail');
const bcrypt =require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const pe =require('./Errors');
const privatekey = require('../../keys').privatekey;

//@route Post /api/user/
//@desc creae new user
//@access public
router.post('/',(req,res)=>{
    if( !req.body.email || !req.body.password || !req.body.fullname)
    {
        res.json({success:"false",Error:pe.Required});
    }
    else{
        if(isemail(req.body.email))
        {
            User.findOne({email:req.body.email},(err,result)=>
            {
                if(err)
                {
                    res.json({success:"false",msg:pe.Unknown});
                     }
                else
                {
                    if(result.length>0)
                    {
                        res.json({success:"false",msg:pe.ALEmail});
                    }
                    else
                    {
                        bcrypt.hash(req.body.password,10, function(err, hash) {
                                if(err){
                                    res.json({success:"false",msg:pe.Unknown});
                                }
                                else
                                {   let names = (req.body.fullname).split(' ');
                                    const Newuser = new User({
                                        
                                        email:req.body.email,
                                        password:hash,
                                        fname : names[0],
                                        lname : names[1]
                                    });

                                    Newuser.save()
                                        .then((final)=>{res.json({success:"true",fname:final.fname,lname:final.lname,email:final.email});})
                                        .catch((err)=>{res.json({success:"false",msg:pe.Unknown});});
                            
                                }
                          });
                    }
                }
            })
        }
        else{
            res.json({success:"false",msg:pe.IEmail});
        }
        
    }
         
        
        
});
//@route Post /api/user/login
//@desc creae new user
//@access public

router.post('/login',(req,res)=>{
    if(!req.body.email || req.body.passport)
    {
        res.json({success:"false",msg:pe.Required});
    }
    else
    {
        User.findOne({email:req.body.email},(err,rdata)=>{
            if(err||!rdata) 
            {
                res.json({success:"false",msg:"Invalid"});
            }
            else
            {
                bcrypt.compare(req.body.password,rdata.password, function(err,isvalid) {
                    // res == true
                    if(err || isvalid==false){
                        res.json({success:"false",msg:"Auth failed"});
                    }
                    else{
                        jwt.sign({id:rdata._id,email:rdata.email,fname:rdata.fname,created :Date.now()},privatekey,{expiresIn:"10h"},(err,token)=>{
                            if(err)
                            {
                                res.json({success:"false",msg:"Something went wrong"});
                            }
                            else{
                                res.json({success:"true",token:"Bearer "+token});
                            }
                        });
                    }
                });
            }
        });
            
    }
    
});

//@route Get /api/user/
//@desc get your details
//@access public






module.exports = router ;