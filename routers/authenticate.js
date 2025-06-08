const router = require('express')
const { loginNewUser } = require('../Controller/authController');

const AuthRouter = router()

/** 
 * 1. header variables
 * 2. body variables
 * 3. query params
 * 4. path variables
*/

AuthRouter
    //post
    .post('/auth/login', loginNewUser)


module.exports = AuthRouter;

