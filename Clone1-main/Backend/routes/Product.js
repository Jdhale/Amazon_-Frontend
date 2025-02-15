const mongoose=require('mongoose');
const ProductScheme=mongoose.Schema({
    title:String,
    imageURL:String,
    price:Number,
    rating:Number,
});
module.exports-mongoose.model('Products',ProductScheme);