const express = require('express');
const path = require('path');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const Admin = require('./admin');
//const fs = require('fs');
const usersArr = require('./database');

const app = express();
const User = require('./user');

const session = require('express-session');
const Account = require('./account');
const Superadmin = require('./superadmin');


session.account =[];
let accDb = session.account;
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
  //console.log(session.users);
    

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
    res.status(200).json(user);

  }else{
    res.status(400).json({status:400,msg:"your must login to create an account"});
  }  
  //console.log(session.account);



});

// logout route
app.get('/api/v1/logout',(req, res)=>{


  User.logout();
  res.json({msg : 'you have successfully sign out'});
});


//delete user route

app.delete('/api/v1/accounts/:accountNumber',(req, res)=>{

  if(session.staffId){
    let acc = parseInt(req.params.accountNumber);


    let admin = new Admin();
    let foundvalue =  admin.deleteAcc(acc,session.account);
    
   
    if (!foundvalue) {
     return res.status(400).json({status:400, msg: "account not found"});
     }
    
     res.status(200).json({status:200, msg:"account delete successfully"});
    
    
  }else{
    res.status(401).json({status:401, msg:'you must login to continue'});
  }


});


//fetch user
app.get('/api/v1/accounts/:accountNumber',(req,res)=>{

if(session.staffId || session.cashierId){
  let acc = parseInt(req.parfuams.accountNumber);
  let admin = new Admin();
  let account = admin.findOne(acc,session.account);
  if(!account) return res.status(400).json({status:400,msg:"account not found"});
  res.status(200).json({status:200, data:account});
}else{
  //User.login(email,password);
  res.status(401).json({status:401, msg:'you must login to continue'});
}
});
// patch user
app.patch('/api/v1/accounts/:accountNumber',(req,res)=>{
  let acc = parseInt(req.params.accountNumber);
 if(session.staffId){
  let admin = new Admin();
let arr = admin.activateAcc(acc,session.account);
if(!arr) return res.status(400).json({status:400,msg: 'account not found'});

res.status(200).json({status:200, data:arr});
 
}else{
   //User.login(email,password);
  return  res.status(401).json({status:401, msg:'you must login to continue'});
 }
  


});


app.post('/api/v1/add-admin', (req,res)=>{
let firstName = req.body.firstName;
let email = req.body.email;
let lastName = req.body.lastName;
let type = req.body.type;
let password = req.body.password;
let isAdmin = req.body.isAdmin;

//let admin = new Superadmin();

 let lastInserted =   Superadmin.addStaff(firstName,lastName,password,email,type = type,isAdmin = isAdmin );
 if(!lastInserted){
     res.status(400).json({msg:"user could not added"});
 }
    
 res.status(200).json({status:200, data: lastInserted});
 //console.log(session.users);
});




//credit account
app.post('api/v1/transaction/:accountNumber/credit',(req,res)=>{
if(session.cashierId){
    let accNum = parseInt(req,params.accountNumber);
    let amount = req.body.amount;

    let cashier = new Cashier();
  let credited =  cashier.credit(accNum,session.account,session.cashierId,amount);
  if(!credited) return res.status(404).json({status:404, msg : "account not found"});
   res.status(200).json({status:200, data : credited});
}else{
  
  return res.status(403).json({status:403,msg:"you must login to accessible the page"})
}
});


//Set environment Port
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening to port ' + PORT);
});