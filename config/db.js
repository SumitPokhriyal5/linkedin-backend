const mongoose=require('mongoose');
mongoose.set('strictQuery', 
true);

const connection=mongoose.connect(process.env.userDB)

module.exports={
    connection
}