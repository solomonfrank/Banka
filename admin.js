
const User = require('./user');
const session = require('express-session');
let accDb = session.account;


class Admin extends User{



    deleteAcc(acc, accArray){
        console.log(accArray);
        let found = accArray.find(user => (user.accNumber === acc));
    //let found = accArray.indexOf(acc)
  /* if(found === -1){
        return false;
    }else{
        let found = accArray.filter(user => user.accNumber !== acc);
        return found;
    }
    
    */
   if(!found){
       return false;
   }else{
    //return accArray.filter(user => user.accNumber !== acc);
   let index =  accArray.indexOf(found)
    return accArray.splice(index,1);
   }
      
   
   
    }

    selectStaff(){
        let staffgroup = usersData.filter(user => user.type === 'cashier');
        return staffgroup;
    }


    activateAcc(acc,accountArr){

        let found = accountArr.find(user => (user.accNumber === acc));
        if(!found) return false;
         
        if(found.status === 'dormant'){
            found.status = 'active';
        }else if(found.status === 'active'){
            found.status = 'dormant';
        }
       
        return found;
    }

    findOne(acc,accArray){
      let  result =    accArray.find(user => user.accNumber === acc);

      if(!result) return false;

      return result;
       

    }
    findAll(){
        if(!session.account) return false;

        return session.account;
    }
}



module.exports = Admin;
