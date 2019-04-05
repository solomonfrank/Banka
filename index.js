const express = require('express');
const path = require('path');

const app = express();
const User = require('./user');
const  account = require('./account');
const staff = require('./staff');
const admin = require('./admin');


//let counter =1;

  //let usersData = [];

let u = new User("solomon","rock",1234567,"solomon13@yahoo.com");
let p = u.save();
console.log(p);
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//set public folder

app.use(express.static(path.join(__dirname,'public')));

app.get('/api/v1/sign-in',(req,res) =>{

   res.send('hello world, hello world');
});


//Set environment Port
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening to port ' + PORT);
});