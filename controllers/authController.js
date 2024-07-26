const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync')

exports.signup = async(req,res)=>{
    try{
    const newUser = await User.create(req.body)
    res.status(201).json({
        status: 'success',
        data:{
            user: newUser
        }
    })
}
catch(err){
    res.status(400).json({
        status: 'User is not created',
        message: err.message
    })
}
}
  