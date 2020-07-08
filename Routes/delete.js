const { verify } = require("jsonwebtoken");

module.exports=(app,jwt,knex)=>{
    app.delete('/delete/:id',(req,res)=>{
        knex('user_posts')
        .where("id",req.params.id)
        .delete()
        .then((data)=>{
            res.redirect('/')
        })
        .catch((err)=>{
            console.log(err)
        })


    })
}