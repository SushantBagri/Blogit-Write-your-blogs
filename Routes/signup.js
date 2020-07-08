const knex = require("../models/database")

module.exports=(app,jwt,knex,bcrypt)=>{
    app.get('/signup',(req,res)=>{
        res.render('pages/signup',{message:req.flash('message')})
    })
    app.post('/signup',(req,res)=>{
        knex
        .select('*')
        .from('user')
        .where('email',req.body.email)
        .then(async (data)=>{
            if(data.length<1){
                req.body.password=await bcrypt.hash(req.body.password,10)
                knex('user')
                .insert(req.body)
                .then((result)=>{
                    console.log('data is inserted')
                    res.redirect('/login')
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
            else{
                req.flash('message','Email address is already used. Enter another Email or do login!')
                res.redirect('/signup')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    })
}