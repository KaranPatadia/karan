//getting required packages
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//connecting to the database
mongoose.connect('mongodb://localhost/shop');

//creating model for the itemlists and customers table
var itemList=mongoose.model("itemlists");
var customer=mongoose.model("customers");

//Redirecting to order page
router.get('/shop/cust/menu/order', function(req, res, next) {
    res.render('order');
});

//Post method for ordering of the items
router.post('/shop/cust/menu/order', function(req, res, next) {
    iteminfo= req.body
    var check=itemList.findOne({_id: iteminfo.id}).exec((err,check)=>{
	if(check==undefined)
            res.render('order',{'error':'Invalid Item ID'});
        else if(iteminfo.quan<=0)
            res.render('order',{'error':'Quantity should be more than 0!!!'})
        else if(check.qty==0)
            res.render('order',{'error':'Item is Out of Stock!!!'})
        else if(iteminfo.quan>check.qty)
            res.render('order',{'error':'Quantity of the item entered is more than our current stock!!!'})
        else{
            var newQty=check.qty-iteminfo.quan;
            itemList.findOneAndUpdate({_id: iteminfo.id},{$set: {"qty": newQty}}).exec((err,item)=>{
                if (err) throw err;  
                else{
                    var total=iteminfo.quan*check.price;
                    res.render('bill',{'id':check._id,'name':check.name,'qty':iteminfo.quan,'price':check.price,'total':total})
                }
            })
        }
  });
});

//Redirecting Menu Page
router.get('/shop/cust/menu/bill', function(req, res, next) {
    res.render('custMenu');
});


module.exports = router;
