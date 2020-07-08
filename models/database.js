const env= require('dotenv').config()
console.log(process.env.host)
console.log(process.env.password)

//set up connection

var knex=require('knex')({
    client:"mysql",
    connection:{
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }
})

//creating table for user_info

knex.schema.createTable('user',(table)=>{
    table.increments('id').primary();
    table.string('name');
    table.string('email');
    table.string('password')
}).then(()=>{
    console.log('user table is created sucessfully')
}).catch(()=>{
    console.log('user table is alredy exists.')
})

//creating table for user_posts

knex.schema.createTable('user_posts',(table)=>{
    table.increments('id').primary();
    table.integer('user_id');
    table.string('user_name')
    table.string('text');
    table.string('description');
    table.string('date');
}).then(()=>{
    console.log('user_posts table created sucessfully')
}).catch(()=>{
    console.log('user_posts table aready exists')
})

//Feedback table
knex.schema.createTable('user_feedback',(table)=>{
    table.increments('id').primary();
    table.string('name')
    table.string('email');
    table.string('subject');
    table.string('feedback');
}).then(()=>{
    console.log('user_feedback table created sucessfully')
}).catch(()=>{
    console.log('user_feedback table aready exists')
})



module.exports=knex;