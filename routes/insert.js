//getting required packages
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

//connecting to the database
mongoose.connect('mongodb://localhost/shop');

//schema for the itemlists  table
var itemSchema = new mongoose.Schema({
    _id: Number,
    name:String,
    qty:Number,
    price:Number
}, { _id: false });
itemSchema.plugin(AutoIncrement);

//creating model for the table
var itemList= mongoose.model('itemLists', itemSchema);

//Redirecting to the insert page
router.get('/shop/admin/menu/insert', function(req, res, next) {
  res.render('insert');
});

//Inserting a item in the Item List
router.post('/shop/admin/menu/insert',function(req,res,next){
  var iteminfo = req.body
  
  var newItem= new itemList({
      name:iteminfo.name,
      qty:iteminfo.qty,
      price:iteminfo.price
  })

  //saving the items in the table
  newItem.save(function(err,itemDetails){
     if(err)
       res.send('errors else ')
     else
       res.send(newItem)
   })
})

//Redirecting to the delete page
router.get('/shop/admin/menu/delete', function(req, res, next) {
  res.render('delete');
});

//Deleting a item from the Item List
router.post('/shop/admin/menu/delete',function(req,res,next){
    var iteminfo = req.body
    var myquery = { _id: iteminfo.id };  

    var check=itemList.findOne({_id: iteminfo.id}).exec((err,check)=>{
    if(check==undefined)
      res.render('delete',{'error':'Item Id does not exist!'});
    else{
        itemList.remove(myquery, function(err, obj) {  
            if (err) throw err;  
            res.send('Item Deleted');  
        });  
    }
  });
})
module.exports = router;

