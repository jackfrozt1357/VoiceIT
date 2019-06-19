const express = require('express')
const app = express();
const passport = require('passport');

const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const morgan  = require('morgan')
const port = process.env.port || 3000;
const keys = require('./keys').mongo_uri;
const UniRoute = require('./api/routes/University');
const UserRoute = require('./api/routes/Users');
const reviewRoute = require('./api/routes/review');

mongoose.connect(keys,{useNewUrlParser:true})
    .then(console.log("MongoDb started"))
    .catch((err)=>console.log("MongoDB Error:"+err));
app.use(morgan('dev'))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(passport.initialize());
require('./config/passport')(passport);

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method==="OPTIONS")
    {
        res.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


app.use('/api/uni',UniRoute);
app.use('/api/user',UserRoute);
app.use('/api/review',reviewRoute);


app.listen(port, () => console.log(`App listening on port ${port}!`))