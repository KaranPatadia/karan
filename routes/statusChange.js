//getting required packages
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//connecting to the database
mongoose.connect('mongodb://localhost/shop');

//creating model for the table
var customer=mongoose.model("customers");

//Redirecting to the statusChange page
router.get('/shop/admin/menu/status', function(req, res, next) {
  res.render('statusChange',{error: ''})
});

//Changing the status of the customers to active
router.post('/shop/admin/menu/status',function(req,res,next){
    var statusinfo = req.body;

    customer.findOneAndUpdate({username: statusinfo.username},{$set: {"status": statusinfo.status}}).exec((err,customer)=>{
        if(customer==undefined)
        res.render('statusChange',{error:'User Not Found!'})
        else
        res.send('Status Change')
    })
});

module.exports = router
