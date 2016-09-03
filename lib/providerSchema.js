
/*var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


var providerSchema = mongoose.Schema({
    serviceProviderName             : { type: String, required: true, unique : true},
    serviceProviderImage            : String,
    serviceProviderDescription      : String,
    serviceProviderMobile           : String,
    serviceProviderUsername         : { type: String, required: true, unique : true},
    serviceProviderPassword         : { type: String, required: true, unique : true},
    serviceProviderEmail            : { type: String, unique : true},
    serviceProviderVerificationCode : String,
    serviceProviderStatus           : { type : String, default : "verified"},
    userToken                       : String,
    //userDeviceId                    : {type: mongoose.Schema.Types.ObjectId, ref: 'user1'},
    //serviceItemId                   : {type: mongoose.Schema.Types.ObjectId, ref: 'serviceItem'},
    serviceProviderAddress:[
        {
            FlatNo   : String,
            StreetNo :String,
            Area     :String,
            City     :String,
            State    :String
        }
    ],
    created  : { type: Date },
    modified : { type: Date }
});

providerSchema.pre('save', function(next){

    now = new Date();
    this.modified = now;
    if ( !this.created ) {
        this.created = now;
    }
    next();
});

providerSchema.pre('save', function(next) {
    var provider = this;

    // Break out if the password hasn't changed
    if (!provider.isModified('serviceProviderPassword')) return next();

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(provider.serviceProviderPassword, salt, null, function(err, hash) {
            if (err) return next(err);
            provider.serviceProviderPassword = hash;
            next();
        });
    });
});



providerSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.serviceProviderPassword, function(err, isMatch) {
        if (err) return cb(err);
        cb(undefined , isMatch);
    });
};

module.exports = providerSchema;*/
