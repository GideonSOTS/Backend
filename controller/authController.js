const User = require('../models/userSchema');
const bcrypt = require('bcryptjs')
const genToken = require('../jwt/genToken')
const loginNewUser = async (req, res) => {
    
    const { gmail, password } = req.body
    if (!gmail||!password) {
        res.status(400).json({message:'Provide all fields'})
        return
    }
    try {
        const user = await User.findOne({ gmail })
        if (!user){
                res.status(400).json({message:'Register an Account'})
                return
            }
            const compared = await bcrypt.compare(password, user.password)
        
            if (!compared){
                res.status(400).json({message:'Wrong username or password'})
                return
            }
            const token = genToken(user._id)
            return res
                   .cookie('token', token, {httpOnly: true, sameSite: 'strict'})
                   .status(200)
                   .json({message: 'Login Successful proceed to make a post'})
    
        } catch (error) {res.status(500).json(error)}
}

module.exports = {loginNewUser}