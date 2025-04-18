export default ()=>{
    return{
       db:{
           uri:process.env.MONGO_URL
       },
       jwt:{
           secret:process.env.JWT_SECRET,
           expiry:process.env.JWT_EXPIRY
       }
    }
   }