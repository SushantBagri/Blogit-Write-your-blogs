const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const bodyParser=require('body-parser')
const knex = require('./models/database');
const flash=require('express-flash');
const session=require('express-session');
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
const methodOverride=require('method-override');

const port=8000;
app.use(express.json());
app.use('/static',express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:false     
}));
app.use(cookieParser());
app.use(flash());
app.use(methodOverride('_method'))

app.set('view engine', 'ejs');

//for logging in
var login=express.Router()
app.use("/",login);
require("./Routes/login")(login,jwt,knex,bcrypt)


// for signing up
var signup=express.Router();
app.use("/",signup)
require('./Routes/signup')(signup,jwt,knex,bcrypt)


//route for home
let home=express.Router();
app.use('/',home)
require('./Routes/home')(home,jwt,knex)


//for giving user his blogs
var user=express.Router()
app.use("/",user);
require("./Routes/user")(user,jwt,knex)


//for creating blog
let create=express.Router();
app.use('/',create)
require('./Routes/create')(create,jwt,knex)



//for deleting blog
let delete_post=express.Router()
app.use('/',delete_post)
require('./Routes/delete')(delete_post,jwt,knex)



//for Logging out
let log_out=express.Router()
app.use('/',log_out)
require('./Routes/logout')(log_out,jwt)



//Deactivation of user account
let deactivate=express.Router()
app.use('/',deactivate)
require('./Routes/deactivate')(deactivate,jwt,knex)

//feedback
let feedback=express.Router();
app.use('/',feedback)
require('./Routes/feedback')(feedback,knex)



//App Listening
let server = app.listen(port, ()=>{
    let host = server.address().address;
    console.log(`your app is running on address ${host} and on port ${port}`)
})
