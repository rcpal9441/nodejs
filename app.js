const express=require('express');
let db=require('./config/database');
let properties=require('./config/properties');
let session=require('express-session');
let engine = require('ejs-locals');
let path = require('path');
let bodyParser = require('body-parser');
let passport=require('passport'); 
let validator = require('express-validator');
let applicationRouter=require('./config/routes');
let fileUpload=require('express-fileupload');
let flash=require('connect-flash');
let moment=require('moment');
/*var cookieParser = require('cookie-parser');*/
const app=express();
app.locals.moment=moment;

/*var MongoStore = require('connect-mongo')(session);*/


//call database connectivity function
db();
 

// view engine setup
app.set('views',path.join(__dirname,'views'));
app.engine('ejs',engine);
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));
app.use('/css',express.static(path.join(__dirname,'css')));
app.use('/js',express.static(path.join(__dirname,'js')));
app.use(flash()); 
app.use(fileUpload());

/*//Passport session setup.
passport.serializeUser(function(user, done) {
 done(null, user);
});

passport.deserializeUser(function(obj, done) {
 done(null, obj);
});
app.use(passport.initialize()); 
app.use(passport.session());

//Session initilize
app.use(cookieParser());*/

app.use(session({
  secret:'698979797988',
  resave : true,
  saveUninitialized : false,
  /*store: new MongoStore({
    url:properties.DB
    //other advanced options
  })*/

}));


function base_url() {
    return `http://localhost:${properties.PORT}/`;
}



app.listen(properties.PORT,(req,res)=>{
	console.log(`Server is running on ${properties.PORT} port.`);
});

app.locals.base_url=base_url();

app.use(function(req,res,next){
    res.locals.sess_data=req.session;
    res.locals.success = req.flash('success');
    res.locals.info = req.flash('info');
    res.locals.error = req.flash('error');
    next();
});

applicationRouter(app);
module.exports=app;