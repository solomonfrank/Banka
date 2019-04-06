const express = require('express');
const path = require('path');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const app = express();
const User = require('./user');

const session = require('express-session');
const Account = require('./account');



// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//set public folder

app.use(express.static(path.join(__dirname,'public')));

app.post('/api/v1/sign-up',(req,res) =>{
   
     let email= req.body.email;
     let password = req.body.password;
     let firstName = req.body.firstName;
     let lastName = req.body.lastName


  //let user =    new User(firstName,lastName,password,email);
  let person  =    new User(firstName,lastName,password,email);

 let userDetail =  person.save();
 //user.save();
  if(!userDetail) return res.status(400).json({status:400, msg:"error in the values your submitted"})
  res.status(200).json({status:200, data : userDetail});
  console.log(session.users);
    

});

// sign in route

app.post('/api/v1/sign-in',(req,res) =>{
   
     let email= req.body.email;
     let password = req.body.password;

  let user =   User.login(email,password);
    if(!user) return res.status(400).json({status:400,msg:"invalid credential"});
  
    res.status(200).json({status:200, data : user});
});

app.post('/api/v1/create-account',(req,res) =>{
   
  if(session.loggedIn){
    let email= req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let openingBalance = req.body.openingBalance;
    let type = req.body.type;

    const person = new Account(firstName,lastName,email,type,openingBalance);
    let user = person.save();
    res.json(user);

  }



});

//Set environment Port
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening to port ' + PORT);
});