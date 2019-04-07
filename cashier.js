

const User = require('./user');
const cashier = require('./cashier');
const session = require('express-session');


class Cashier extends User{


    debit(accNum,accData,cashier,amount){
      let found  =  accData.find( acc => acc.accNumber === accNum);
      console.log(found);
      
      if(!found) return false;
    if(found.Balance < amount){
      found.Balance = found.Balance;
    }else{
      found.Balance = found.Balance - amount;
    }
      
      return {
        ...found,
        cashier,
        transactionType : 'debit',
        transactionId : Math.floor(Math.random() * 1000000)

      }
             


    }

    credit(accNum,accData,cashier,amount){
      console.log(accData);
      let found  =  accData.find( acc => acc.accNumber === accNum);
      console.log(found);
      
      if(!found) return false;

      found.Balance = found.Balance + amount;
      return {
        ...found,
        cashier,
        transactionType : 'credit',
        transactionId : Math.floor(Math.random() * 1000000)

      }
    }
}

module.exports = Cashier;

