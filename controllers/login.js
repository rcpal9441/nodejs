var express=require('express');
var auth = require('../config/session');
var router=express.Router();
var userDao=require('../models/user.dao');
var md5=require('md5');


router.get('/',auth.checkLogin,function(req,res,next){
  res.render('login',{title:'Rashifal/Event Login'});
});

router.post('/login',function(req,res,next){
	
  if(req.body.email != '' && req.body.password!='') {
  	var password = md5(req.body.password);
    userDao.get({email:req.body.email}, function(err, users) {
        if(err) {
            res.json({
                error: err
            });
        }
        console.log(users);
        if(users.length>0){
        	if(users[0].password==password){
        		req.session.admin_email = users[0].email;
            req.session.admin_login = true;
        		res.json({success:"success"}); 
        	}else{
            res.json({error:"Invalid password"});
          }
        }else{
        	res.json({error:"Invalid username"});
        }
    });

  }else{
  	res.json({error:"Please enter username/password"});
  }
}); 

router.get('/logout',function(req,res){
	req.session.admin_email='';
	req.session.admin_login=false;
	res.redirect(base_url);
});

module.exports=router;