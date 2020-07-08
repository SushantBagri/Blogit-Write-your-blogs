

module.exports=(app,jwt,knex,bcrypt)=>{
    app.get('/login',(req,res)=>{
        res.render('pages/login',{message: req.flash('message')})
    })
    app.post('/login',(req,res)=>{
        knex
        .select('*')
        .from('user')
        .where('email',req.body.email)  
        .then(async (data)=>{
            if(data.length>0){
                if(await bcrypt.compare(req.body.password,data[0].password)){
                    const userData={
                        id:data[0].id,
                        name:data[0].name
                    }
                    const token=jwt.sign(userData,'sushant')

                    return res.cookie('token', token, {
                        expires: new Date(Date.now() + 100000000),
                        secure: false, 
                        httpOnly: true,
                      }).redirect('/');
                }
                else {
                req.flash('message','Password is incorrect')
                res.redirect('/login')
                }
            }
            req.flash('message','User does not exist.Check Email address or do sign up')
            res.redirect('/login')
        })
        .catch((err)=>{
            console.log(err)
        })
        
        
    })
}