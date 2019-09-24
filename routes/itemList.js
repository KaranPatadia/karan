//getting required packages
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//connecting to the database
mongoose.connect('mongodb://localhost/shop');

//schema for the itemlists table
var itemSchema = new mongoose.Schema({
    _id:Number,
    name: String,
    qty: Number,
    price: Number
});

//creating model for the table
var item=mongoose.model("itemlists",itemSchema);

//Redirecting to the itemList page
router.get('/shop/cust/menu/list',function(req,res,next){
    var itemlist=item.find({}).exec((err,list)=>{
        res.render('itemList',{list});
    })
})

module.exports=router
