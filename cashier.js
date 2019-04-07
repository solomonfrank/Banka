const User = require('./user');
const Admin = require('./admin');

class Cashier extends User{

    debitAcc(accNum,accData,cashier,amount){
 let found  =  accData.find( acc => acc.item === accNum);
             return {

              transactionId: Math.floor(Math.random() * 1000000),
              accountNumber : accNum,
              amount: amount,
              cashier: cashier.id,
              transactionType:debit,
              accountBalance: `${found.balance - amount}`

             };

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
