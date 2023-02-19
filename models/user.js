const mongoose=require('mongoose');
const UserSignUpSchema= mongoose.Schema({
    user_name: String,
    category:String,
    email: String,
    password: String,
})

const userModel = mongoose.model("Users",UserSignUpSchema)

module.exports = userModel;