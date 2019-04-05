const express = require('express');
const path = require('path');
//let counter =1;

const app = express();
const User = require('./user');
//const usersData = require('./user');
const session = require('express-session');
const sessionStorage = require('sessionstorage');

app.use(session({secret:"ygygugugt66r56rr5",resave:false,saveUninitialized:true}));
const  account = require('./account');
const staff = require('./staff');
const admin = require('./admin');
//console.log(counter);

//let u = new User("solomon12","rock",1234567,"solomon13@yahoo.com");
//let x = new User("solomon13","rock",1234567,"solomon13@yahoo.com");
//let p = u.save();
//x.save();

//let y = x.save();
//console.log(p);
//console.log(y);
//console.log(usersData);
//console.log(User.getSession());
console.log(session.users);


// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//set public folder

app.use(express.static(path.join(__dirname,'public')));

app.post('/api/v1/sign-in',(req,res) =>{
   
     let email= req.body.email;
     let password = req.body.password;
     const sign = {
       email,
       password
     }
   res.json(sign);
});


//Set environment Port
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening to port ' + PORT);
});