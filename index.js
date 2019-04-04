const express = require('express');
const path = require('path');

const app = express();


// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//set public folder

app.use(express.static(path.join(__dirname,'public')));


app.get('/',(req,res)=>{


  res.send('hello world!');
});

//Set environment Port

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('listening to port ' + PORT);
});