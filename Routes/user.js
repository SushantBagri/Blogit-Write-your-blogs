module.exports=(app,jwt,knex)=>{
    app.get('/user/:user_name',(req,res)=>{
        if(req.cookies!==undefined && req.cookies!==''){
            let token = req.cookies.token;
            jwt.verify(token,'sushant',(err,decoded_data)=>{
                if(!err){
                    knex
                    .select('*')
                    .from('user_posts').where('user_id',decoded_data.id)
                    .then((data)=>{
                        for(let i=0; i<data.length; i++){
                            let date1 = new Date(data[i].date)
                            let date2 = new Date();
                            let diffTimeSec= Math.ceil((date2 - date1)/1000);
                            let diffTimeMinutes = Math.ceil((date2 - date1)/(1000*60));
                            let diffTimeHour = Math.ceil((date2 - date1)/(1000*60*60));
                            
                            let diffDays = Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
                            if(diffTimeSec<60){
                                if(diffTimeSec==1){
                                    data[i].date=diffTimeSec+' second'
    
                                }
                                else{
                                    data[i].date=diffTimeSec+' seconds'
                                }
                            }
                            else if(diffTimeMinutes<59){
                                if(diffTimeMinutes==1){
                                    data[i].date=diffTimeMinutes+' Minute'
                                }
                                else{
                                    data[i].date=diffTimeMinutes+' Minutes'
    
                                }
                    
                            }
                            else if(diffTimeHour<24){
                                if(diffTimeHour==1){
                                    data[i].date=diffTimeHour+' Hour'
                                }
                                else{
                                    data[i].date=diffTimeHour+'Hours'
    
                                }
                            }
                            else{
                                if(diffDays==1){
                                    data[i].date=diffDays+' Day'
                                }
                                else{
                                    data[i].date=diffDays+' Days'
    
                                }
                            }
                        }
                        res.render('pages/user',{data,decoded_data})
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
        else{
            res.redirect('/login')

        }
        
    })
}