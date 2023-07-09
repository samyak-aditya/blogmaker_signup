const { hashPassword, comparePassword} = require('../helpers/auth')

const test = (req,res) => {
    res.json('test is working')
}

const registeruser = async (req, res) => {
    try {
        const {name,email,password} =req.body;
        if (!name || !email){
            return res.json({ error: 'name and email is required'})
            alert('name and email is required')
            
        };

        if(!password || password.length <6){
            return res.json({ error: 'password  is required and should be at least 6 character long' })
        };

        const exist= await UserActivation.findOne({email});
        if (exist) {
            return res.json({ error: 'Email is already taken' })
        }

        const hashedPassword =await hashedPassword(password)
        const user = await User.create({
            name,email,password: hashedPassword,
        });


        return res.json(user);
} catch (error) {
    console.log(error);
}
};

const loginUser = (req, res)=>{
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
            res.json({'password matched'})
        }
        if(!match) {
            res.json({
                error: 'Password do not match'
            })
        }
    } catch (error){
        console.log(error)}
    }
}

module.exports = 
    test,
    registeruser,
    loginUser