const express = require('express');
const path = require('path');

const app = express();


// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//set public folder

app.use(express.static(path.join(__dirname,'public')));

app.post('/api/v1/sign-in',(req,res) =>{
   
     let email= req.body.email;
     let password = req.body.password;

  let user =   User.login(email,password);
    
   res.json(user);
});


//Set environment Port
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening to port ' + PORT);
});