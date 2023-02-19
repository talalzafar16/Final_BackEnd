const mongoose=require('mongoose');
const UserSignUpSchema= mongoose.Schema({
    email: String,
    user_name: String,
    category:String,
    password: String,
})
const EmergencySchema= mongoose.Schema({
    user_name: String,
    location:String,
    emergency: String,
    department: String,
})

const userModel = mongoose.model("Users",UserSignUpSchema)
const EmergencyModel = mongoose.model("Emergencies",EmergencySchema)

module.exports = {userModel , EmergencyModel};