
class Admin extends User{
    deleteAcc(acc,accArray){
      
    let found = accArray.indexOf(acc)
    if(found === -1){
        return false;
    }else{
        let found = accArray.filter(user => user.accNumber !== acc);
        return found;
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
        let found = accArray.indexOf(acc)
        if( found === -1){
            return false
        }else{
         let found =    accArray.find(user => user.accNumber === acc);
         return found;
        }

    }
    findAll(){
        if(!session.account) return false;

        return session.account;
    }
}


