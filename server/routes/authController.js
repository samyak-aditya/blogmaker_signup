

const test = (req,res) => {
    res.json('test is working')
}

const registeruser = (req, res) => {
    try {
        const {name,email,password} =req.body;
        if (!name || !email){
            return res.json({ error: 'name and email is required'})
            alert('name and email is required')
            
        }
} catch (error) {

}
}

module.exports = 
    test,
    registeruser