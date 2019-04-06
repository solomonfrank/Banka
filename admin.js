const User = require('./user');

class Admin extends User{
    


    addStaff (firstName,lastName,password,email,type,isAdmin){
     let staff =   new User( firstName,lastName,password,email,type = type,isAdmin = isAdmin );
     staff.save();
    }

    deleteAcc(acc,array){

    let found =accDb.filter(user => user.accNumber !== acc)
      
     if (!found) return false;
     return found;
    }

    selectStaff(){
        let staffgroup = usersData.filter(user => user.type === 'cashier');
        return staffgroup;
    }
}



module.exports = Admin;
