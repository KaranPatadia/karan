//getting required packages
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


//connecting to the database
mongoose.connect('mongodb://localhost/shop');

//schema for the adminInfo table
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});
var admin= mongoose.model('adminInfo', userSchema);

//Admin Registration code
router.get('/shop/admin/regis', function(req, res, next) {
  res.render('adminReg');
});

//Storing the new admin details in database
router.post('/shop/admin/regis',function(req,res,next){
  var admininfo = req.body

    var newadmin= new admin({
      username: admininfo.username,
      password: admininfo.password
    })

   //saving the new admin details in database
   newadmin.save(function(err,adminDetails){
     if(err)
       res.send('errors')
     else
       res.render('adminLogin')
   })
})


//Admin Login Code
router.get('/shop/admin/login', function(req, res, next) {
  res.render('adminLogin',{'error':' '});
});

//Checking if login details are correct or not
router.post('/shop/admin/login',function(req,res,next){
  var admininfo = req.body
  var check=admin.findOne({username: admininfo.username,password: admininfo.password}).exec((err,check)=>{
    if(check==undefined)
      res.render('adminLogin',{'error':'Incorrect username or password'});
    else{
      res.render('adminMenu');
    }
  });
});


//Redirect to Admin Home Page
router.get('/shop/admin', function(req, res, next) {
  res.render('adminHome.pug');
});
module.exports = router;

