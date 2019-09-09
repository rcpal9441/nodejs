var express=require('express');
var auth = require('../config/session');
var router=express.Router();

router.get('/dashboard',auth.checkLogout,function(req,res,next){
  res.render('dashboard',{title:'Dashboard',data:[]}); 
});

module.exports=router;