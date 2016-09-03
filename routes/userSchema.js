var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


var userSchema = mongoose.Schema({
    token : String,
    user : {
        
        username : {type: String, required: true,unique : true},
        password : {type: String ,required: true,unique : true},
        firstname: String,
        lastname:  String,
        mobile   : String,
        created  : { type: Date },
        modified : { type: Date }
    }

});

userSchema.pre('save', function(next){

    now = new Date();
    this.user.modified = now;
    if ( !this.user.created ) {
        this.user.created = now;
    }
    next();
});

userSchema.pre('save', function(next) {
    var user = this;

    // Break out if the password hasn't changed
    if (!user.isModified('user.password')) return next();

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.user.password = hash;
            next();
        });
    });
});



userSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.user.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(undefined , isMatch);
    });
};
module.exports = userSchema;
