const User = require('./user');
const session = require('express-session');
let accDb = session.account;

class Admin extends User{
    


    addStaff (firstName,lastName,password,email,type,isAdmin){
     let staff =   new User( firstName,lastName,password,email,type = type,isAdmin = isAdmin );
     staff.save();
    }

    deleteAcc(acc, accArray){
       
    let found = accArray.indexOf(acc)
    if(found === -1){
        return false;
    }else{
        let found = accArray.filter(user => user.accNumber !== acc);
        return found;
    }
   
      //console.log(found)
    
    
    }

    selectStaff(){
        let staffgroup = usersData.filter(user => user.type === 'cashier');
        return staffgroup;
    }
}



module.exports = Admin;
