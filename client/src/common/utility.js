

export const getAuthor = (user)=>{
    if(user && user.firstName && user.lastName){
        return `By ${user.firstName} ${user.lastName}`
    }else{
        return null;
    }
    
}