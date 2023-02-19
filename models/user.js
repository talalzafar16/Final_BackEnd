const mongoose=require('mongoose');
const UserSignUpSchema= mongoose.Schema({
    email: String,
    user_name: String,
    category:String,
    password: String,
})

const userModel = mongoose.model("Users",UserSignUpSchema)

module.exports = userModel;