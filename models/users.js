var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email :{
        type: String,
        useCreateIndex : true,
        required : true
    },
    password : {
        type: String,
        useCreateIndex : false,
        required : true
    }
}, {
    timestamps: true
});

module.exports = userSchema;