const knex = require("../models/database");

module.exports=(app,jwt,knex)=>{
    app.delete('/deactivate_user',(req,res)=>{
        if(req.cookies!==undefined && req.cookies!==''){
            let token = req.cookies.token;
            jwt.verify(token,'sushant',(err,decoded_data)=>{
                if(!err){
                    knex('user')
                    .where('id',decoded_data.id)
                    .delete()
                    .then((data)=>{
                    })
                    .catch((err)=>{
                        console.log(err)
                    })

                    knex('user_posts')
                    .where('user_id',decoded_data.id)
                    .delete()
                    .then((data)=>{
                        res.redirect('/login')
                    })
                    .catch((err)=>{
                        console.log(err)
                    })

                }
                else{
                    res.redirect('/login')
                }
                
                
            })
    }
})
}