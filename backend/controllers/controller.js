const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req , res)=>{
    try{
        const {name , email , password} = req.body;
        const existingUser = await User.findOne({email})

        if (existingUser){
            return res.status(400).json({message:'User Already Exist'})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password:hashPassword
        })
        await user.save()
        res.status(201).json({message:'User Registerd Successfully'})
    }catch(error){
        res.status(500).json({message:error.message})
    }
} 

const loginUser = async(req , res)=>{
    try{
        const {email , password} = req.body;
        const  user = await User.findOne({email})
        if (!user){
            return res.status(400).json({message:'User Not Found'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            res.status(400).json({message:'Invalid Credentials'})
        }
        const token = jwt.sign(
             {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        )
        res.status(200).json({message:'Login Sucessfull', token, name:user.name})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports = {registerUser , loginUser}