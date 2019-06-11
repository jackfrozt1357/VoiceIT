var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = require('../keys').privatekey;
const User = require('../api/models/User');

module.exports=(passport)=>{
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({email : jwt_payload.email}, function(err, person) {
        if (err) {
            return done(err, false);
        }
        if (person) {
            return done(null, person);
        } else {
            return done(null, false);
            
        }
    });
}));


};
