const {userModel,EmergencyModel} = require("../models/user")
const bcrypt = require("bcrypt");
const UserControllers={
    SignUpApi:(request,response) =>{
        const {userName,email,password,category}=request.body;
        if(!userName || !email || !password || !category) {
            response.json({
                message:"required fields are missing",
                status:false,
            })    
        }
        else{
        userModel.findOne({email:email},(err,data)=>{
            if(err){
                response.json({
                    message:`Internat error ${err}`,
                    status:false
                })
            }
            else{
                if(data){
                    response.json({
                        message:"Email already in use",
                        status:false,
                    })
                }
                else{
                    const hashPass=bcrypt.hashSync(password,10)
                    const objToSend ={
                        user_name:userName,
                        category:category,
                        email:email,
                        password:hashPass,
                    }
                    userModel.create(objToSend,(err,data)=>{
                        if(err){
                            response.json({
                                message:`Internat error ${err}`,
                                status:false
                            })
                        }
                        else{
                            response.json({
                                message:`Successfully signed up`,
                                status:true,
                                data,
                            })
                        }
                    })
                }
            }
    
        })
    }
        
    },
    LogInApi:(request,response)=>{
        const {email,password}=request.body||{};
        if(!email || !password){
            response.json({
                message: 'Required fields are empty',
                status:false
            })
            return;
        }
        userModel.findOne({email:email},(err,data)=>{
            if(err){
                response.json({
                    message:"data not found",
                    status:false
                })
            }
            else{
                if(data){
                    if(bcrypt.compareSync(password,data.password)){
                        response.json({
                            message:"User Succesfully Loged in",
                            status:true,
                            data,
                        })
                    }
                    else{
                        response.json({
                            message:"wrong credentials",
                            status:false
                        })
                    }
            }
            else{
                response.json({
                        message:"Wrong Credentials",
                        status:false
                    })
                }
            }
        })
    },
    GetData:(request,response)=>{
        const {Uid} = request.params;
        userModel.findById(Uid,(error,data)=>{
            if(error){
                response.json({
                    message:"data not found",
                    status:false
                })
            }
            else{
                response.json({
                    message:"data found",
                    data:data,
                    status:false
                })
            }
        })
    },
    SendData:(request,response)=>{
        const body = request.body
        const {Emergency, location, to_Whom ,user_name} = body || {};
        if(!Emergency || !location || !to_Whom || !user_name){
            response.json({
                message: "Field is empty",
                status:false
            })
        }
        else{
        const objToSend={
            user_name: user_name,
            location: location,
            emergency: Emergency,
            department: to_Whom,
        }
        EmergencyModel.create(objToSend,(error,data)=>{
            if(error){
                response.json({
                    message:`Internal Error : ${error}`,
                    status:false
                });
            }
            else{
                response.json({
                    message:`Successfully data send`,
                    data:data,
                    status:true
                });
            }
        })}
    },
    UpdateData:(request,response)=>{
        const dataToUpdate=request.body
        const {Uid}=request.params
        userModel.findByIdAndUpdate({_id:Uid}, dataToUpdate,(err,data)=>{
            if(err){
                response.json({
                    message:`Internal Error : ${err}`,
                    status:false
                });
            }
            else{
                response.json({
                    message:`Data Updated`,
                    status:true,
                });
            }
        })
        },
    DeleteData:(request,response)=>{
        const {Uid} = request.params
        const obj = request.body;
        userModel.findByIdAndDelete({_id:Uid},obj,(err,data)=>{
            if(err){
            response.json({
                message:`Internal Error : ${err}`,
                status:false
            });
        }
            else{
                response.json({
                    message:`User Deleted`,
                    status:true
                });
            }
        })
    }
}

module.exports=UserControllers