class staff extends User{

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
      return {

       transactionId: Math.floor(Math.random() * 1000000),
       accountNumber : accNum,
       amount: amount,
       cashier: cashier.id,
       transactionType:debit,
       accountBalance: `${found.balance + amount}`

      };
    }
}
