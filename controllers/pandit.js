let express=require('express');
let auth=require('../config/session');
let router=express.Router();
let panditModel=require('../models/pandit.dao');
const {check, validationResult} = require('express-validator');

router.get('/pandit',auth.checkLogout,function(req,res,next){
 res.locals.query = req.query;
 panditModel.get({},function(err,data){
  if(err){
    throw err;
  }else{
    res.render('pandit-manager',{title:'Pandit Manager',data:data});
  }
 });
 
}); 

router.get('/pandit-add',auth.checkLogout,function(req,res,next){
        res.locals.query = req.query;
        res.render('pandit_add',{title:'Add Pandit',no_results:true,data:[]});
}); 

router.post('/panditPost',[check('pandit_name').not().isEmpty().withMessage('Name is required')],auth.checkLogout,function(req,res,next){
  const errors = validationResult(req);
  let post=req.body;
  if (!errors.isEmpty()) {
  	req.flash('error', errors.array());
    res.redirect('/pandit-add');
    //return res.status(422).json({ errors: errors.array() });
  }else{
  	let imageName='';
    if(req.files.image_path!==undefined && req.files.image_path.name!==''){
       let img=req.files.image_path;
       imageName=new Date().getTime()+img.name;
       console.log(__dirname);
       img.mv(__dirname+'/../public/img/'+imageName,function(err){
        if(err){
        	throw err;
        }
       });
    }
    let data={name:post.pandit_name,image_path:imageName,status:post.pandit_status}
    panditModel.create(data,function(err){
     if(err){
     	throw err;
     }else{
     	req.flash('success', 'Pandit added successfully.');
     	res.redirect('/pandit');
     }
    });

  }
});

module.exports=router;