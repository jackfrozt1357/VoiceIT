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


app.use('/api/uni',UniRoute);
app.use('/api/user',UserRoute);
app.use('/api/user',reviewRoute);


app.listen(port, () => console.log(`App listening on port ${port}!`))