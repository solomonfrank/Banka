class Admin extends User{
    


    addStaff (firstName,lastName,password,email,type,isAdmin){
     let staff =   new User( firstName,lastName,password,email,type = type,isAdmin = isAdmin );
     staff.save();
    }

    deleteAcc(acc,array){

    let found =accDb.filter(acc => acc.accNumber !== acc && acc.status==='dormant')
      
     if (found) return found;
    }

    selectStaff(){
        let staffgroup = usersData.filter(user => user.type === 'cashier');
        return staffgroup;
    }
}


