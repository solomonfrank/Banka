const User = require('./user');
const Admin = require('./admin');

class Cashier extends User{

    debit(accNum,accData,cashier,amount){
      let found  =  accData.find( acc => acc.accNumber === accNum);
      console.log(found);
      
      if(!found) return false;

      found.Balance = found.Balance - amount;
      return {
        ...found,
        cashier,
        transactionType : 'debit',
        transactionId : Math.floor(Math.random() * 1000000)

      }
             

    }

    credit(accNum,accData,cashier,amount){
      let found  =  accData.find( acc => acc.item === accNum);
      if(!found) return false;

      return {

       transactionId:`${Math.floor(Math.random() * 1000000)}`,
       accountNumber : accNum,
       amount: amount,
       cashier: cashier,
       transactionType:credit,
       accountBalance: `${found.balance + amount}`

      };
    }
}
