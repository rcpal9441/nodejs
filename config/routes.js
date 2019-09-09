let login=require('../controllers/login');
let dashboard=require('../controllers/dashboard');
let pandit=require('../controllers/pandit');
module.exports=function(app){
	app.use('/',login);
	app.use('/',dashboard);
	app.use('/',pandit);
}