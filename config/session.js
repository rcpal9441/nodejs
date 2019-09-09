function checkLogin(req,res,next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
     base_url = req.app.locals.base_url;
     //console.log(req.session);
    if(req.session && req.session.admin_login == true && req.session.admin_email)
    {
         res.redirect(base_url+"dashboard");
    }
    else
    {
        return next();
    }
 
}

function checkLogout(req,res,next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
     base_url = req.app.locals.base_url;

    if(req.session.admin_login == undefined || req.session.admin_login == false)
    {
        res.redirect(base_url);
    }
    else
    {
        return next();
    }

}

module.exports.checkLogin = checkLogin;
module.exports.checkLogout = checkLogout;