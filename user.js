
const session = require('express-session');
//const sessionStorage = require('sessionstorage');
const jwt = require('jsonwebtoken');


let counter = 1;

  session.users = [];
  let usersData = session.users;


 let accDb = [];
let accountCounter = 0;
 
class User{  //generic user class
    
   
    constructor( firstName,lastName,password,email,type= 'client',isAdmin = false ){
    
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email
        this._password = password;
        this._type = type;
        this._isAdmin = isAdmin;
        this._loggedIn = false;
        
        
        this._id = counter; // user id to keep track of users
       
      
        counter = counter + 1 ;
     
    }
   

    getPassword(){
        return this._password;
    }
    setPassword(password){
         this._password = password;
    }

    getFirstName(){
        return this._firstName;
    }

    setFirstName(firstName){
        this._firstName = firstName;

    }

    getLastName(){
        return this._lastName;
    }

    setLastName(lastName){
        this._lastName = lastName;
    }

    getEmail(){
        return this._email;
    }

    setEmail(email){
        this.email = email;
    }

    getType(){
        return this._type;
    }
    setType(){
        this._type = true;
    }

    getIsAdmin(){
        return this._isAdmin;
    }
    setIsAdmin(){
        this.isAdmin =true;
    }

    getId(){
        return this._id;
    }

   static getLoggedIn(){
       return this._loggedIn;
   }



save(){

    let first = this.getFirstName();
    let last = this.getLastName();
    let email = this.getEmail();
    let password = this.getPassword();
    let type = this.getType();
    let isAdmin = this.getIsAdmin();
    let id = this.getId();


  let  users = {
        id,
        email,
        first,
        last,
        password,
        type,
        isAdmin
       
    }
  
   if(!session.users){
       session.users = [];
    
   }
   let lastInsert;
   if(session.users.push(users)){
       lastInsert = {
        
        id :this._id,
        email,
        first,
        last
     }
     return lastInsert;
   }else{
       lastInsert = false;
       return lastInsert;
   };
   

  

 
 
     
}

  static login(email,password){
      let found = usersData.find(user => (user.email === email && user.password === password));
      
      if(!found) return false;
       
      //this._loggedIn = true;
      found.isLoggedIn = true;

      session.loggedIn =true;
      session.userId  =  found.id;

      return found;
      

  }

  static logout(){
      this._loggedIn = false;
  }

}

//console.log(usersData);


module.exports = User;

