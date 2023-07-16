const { hashPassword, comparePassword} = require('../helpers/auth')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const test = (req,res) => {
    res.json('test is working')
}

const registerUser = async (req, res) => {
    try {
        const {name,email,password} =req.body;
        if (!name){
            return res.json({ error: 'name and email is required'})
            alert('name and email is required')
            
        };

        if(!password || password.length <6){
            return res.json({ error: 'password  is required and should be at least 6 character long', })
        };

        const exist= await User.findOne({email});
        if (exist) {
            return res.json({ error: 'Email is already taken', })
        }

        const hashedPassword =await hashPassword(password)
        const user = await User.create({
            name,email,password: hashedPassword,
        });

        


        return res.json(user);
} catch (error) {
    console.log(error);
}
};

const loginUser = async (req, res)=>{
    try{
        const{email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error:'No user found'
            })
        }

        const match = await comparePassword(password, user.password)
        if(match){
            jwt.sign({email: user.email, id: user._id, name: user.name},process.env.JWT_SECRET, {}, (err,token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            res.json('password matched')
        })
        if(!match) {
            res.json({
                error: 'Password do not match'
            })
        }}
    } catch (error){
        console.log(error)}
    }



module.exports = {
    test,
    registerUser,
    loginUser
}