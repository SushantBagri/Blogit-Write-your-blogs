
module.exports=(app,jwt,knex)=>{
    app.get('/create',(req,res)=>{
        if(req.cookies!==undefined && req.cookies!==''){
            let token = req.cookies.token;
            jwt.verify(token,'sushant',(err,decoded_data)=>{
                if(!err){
                    res.render('pages/create',{decoded_data})
                }
                else{
                res.redirect('/login')
                }
            })
        }
        else{
            res.redirect('/login')

        }
        
    })
    app.post('/create',(req,res)=>{
        if(req.body.text!==undefined || req.body.description!==undefined || req.body.text!=="" || req.body.description!==""){
            var tokenData=jwt.verify(req.cookies.token,'sushant');
            let post=req.body;
            console.log(tokenData)
            post['user_id']=tokenData.id;
            post['user_name']=tokenData.name
            post['date']=new Date();
            knex('user_posts').insert(post)
            .then((result)=>{
                res.redirect('/')
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
    })
}