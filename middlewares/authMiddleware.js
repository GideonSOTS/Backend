const jwt = require('jsonwebtoken')
const userModel = require ('../models/userSchema')

const authMiddleware = async (req, res, next) => {

    const accessTokenInHeader = false;
    const accessToken = req.cookies.token
    const jwtSecret = process.env.JWT_SECRET

    if (!accessToken){
        return res.status(401).json({message:'Login first !'})
    } try {
        const tokenWithSecret = jwt.verify(accessToken, jwtSecret)
        if (!tokenWithSecret){
            return res.status(401).json({message:'Invalid token !'})
        }
        const user = await userModel.findById(tokenWithSecret.userId).select('-password')
        if (!user){
            return res.status(401).json({message:'Invalid Id !'})
        }
        req.user = user
        next()       
    } catch (error){
        res.status(500).json(error)
    }
}
module.exports = authMiddleware