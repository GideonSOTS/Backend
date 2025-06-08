const router = require('express')
const { createUser, readUser, updateUser, deleteUser, getOneUser } = require('../Controller/userController')
const authMiddleware = require("../middlewares/authMiddleware")

const UserRouter = router()

/** 
 * 1. header variables
 * 2. body variables
 * 3. query params
 * 4. path variables
*/

UserRouter
    //post
    .post('/user/register', createUser)

    //get
    .get('/users', authMiddleware, readUser)
    .get('/user/:id', authMiddleware, getOneUser)

    //update
    .put('/user/update/:id', updateUser)
    
    //delete
    .delete('/user/delete/:id', deleteUser)

module.exports = UserRouter;

