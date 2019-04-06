const User = require('./user')
//const uuid = require('uuid');  //uuid.v4

session.account =[];
let accDb = session.account;


let accountCounter = 1;
class Account{
    constructor(firstName,lastName,email,type,openingBalance = 0){
        this._firstName = firstName;
        this._lastName =lastName;
        this._email= email;
        this._type = type;
        this._openingBalance = openingBalance;
        this._balance = this._openingBalance;
        this._id = accountCounter;
        this._status = 'dormant';
        accountCounter  = accountCounter + 1;
        this._accountNumber = Math.floor((1 + Math.random()) * 1000000 );

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
        this._email = email;
    }

    getType(){
        return this._type;
    }
    setType(){
        this._type = true;
    }

    getAccountNumber(){
        return this._accountNumber;
    }
  
    getBalance(){
     return   this._balance = this._openingBalance;
      
    }
   
    getStatus(){
        return this._status;
    }
    setStatus(){
        let balance = getBalance();
        if (balance  <= 0) this_status ='dormant';

        this._status = 'active'
    }
  
    save(){
        let first = this.getFirstName();
        let last = this.getLastName();
        let email = this.getEmail();
        let Balance = this.getBalance();
        let type = this.getType();
        let accNumber = this.getAccountNumber();

    let user = {
        first,
        last,
        email,
        Balance,
        type,
        accNumber

    }
  // return  accDb.push(user1);
  if(!session.users){
    session.account = [];
 
}
let lastInsert;
if(session.account.push(user)){
    lastInsert = {
     
     id :this._id,
     email,
     first,
     last,
     userId: session.userId
  }
  return lastInsert;
}else{
    lastInsert = false;
    return lastInsert;
};


  }

 static  debitAcc(acc,accData,admin){

  }
} 

//const p = new Account('solo','rock','solo@yahoo.com','saving','7777');
//const y = new Account('solo1','rock','solo@yahoo.com','saving','7777');
//p.save();
//y.save();

//console.log(accDb);

module.exports = Account;