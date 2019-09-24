//getting required packages
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//connecting to the database
mongoose.connect('mongodb://localhost/shop');

//schema for the customers table
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    status: String
});
var customer= mongoose.model('customers', userSchema);

//Customer Registration code
router.get('/shop/cust/regis', function(req, res, next) {

  res.render('custReg');
});

//Storing the new customers details in database
router.post('/shop/cust/regis',function(req,res,next){
  var custinfo = req.body

    var newCust= new customer({
      username: custinfo.username,
      password: custinfo.password,
      status: 'Disable'
    })

   //saving the new customers details in database
   newCust.save(function(err,custDetails){
     if(err)
       res.send('errors else ')
     else
       res.render('custLogin')
   })
})


//Customer Login code
router.get('/shop/cust/login', function(req, res, next) {
  res.render('custLogin',{'error':' '});
});


//Checking if login details are correct or not
router.post('/shop/cust/login',function(req,res,next){
  var custinfo = req.body
  var check=customer.findOne({username: custinfo.username,password: custinfo.password}).exec((err,check)=>{
    if(check==undefined)
      res.render('custLogin',{'error':'Incorrect username or password'});
    else if(check.status=="Disable")
      res.render('custLogin',{'error':'Your Status is disabled'});
    else{
      billList=[];
      res.render('custMenu')
    }
  });
});


//Redirect to Customer Home Page
router.get('/shop/cust', function(req, res, next) {
  res.render('custHome.pug');
});

module.exports = router;

