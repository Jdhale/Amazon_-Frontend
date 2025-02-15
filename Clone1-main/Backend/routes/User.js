const mongoose=require('mongoose');
const UserSchema=mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
});
module.exports-mongoose.model('users',UserSchema);