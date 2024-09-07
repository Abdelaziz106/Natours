const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync')
const jwt = require('jsonwebtoken')
const sign_token=id=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn:process.env.Expiry
})}
exports.signup = async(req,res)=>{
    try{
    const newUser = await User.create({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirmation:req.body.passwordConfirmation
    })
  
    const token =sign_token(newUser._id)
    res.status(201).json({
        status: 'success',
        token,
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
exports.login= async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({
            status: 'fail',
            message:'please provide email and password'
        })
        
    }
    const user = await User.findOne({email}).select(+password)
    const correct = await user.CorrectPassword(password,user.password)
    if(!user || !correct){
    return res.status(401).json({
        status: 'fail',
        message:'Incorrect email or password'
    })}
const token = sign_token(user._id)
res.status(200).json({
    status: 'success',
    token
})
}