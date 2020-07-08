module.exports=(app,jwt)=>{
    app.delete('/log_out',(req,res)=>{
        if(req.cookies!==undefined && req.cookies!==''){
            res.clearCookie("token");
            res.redirect('/login')
        }
        else{
            res.redirect('/login')
        }
    })
}