const express = require('express');
const Userrouter = require('./routers/user');
const productRouter = require('./routers/product');
const AuthRouter = require('./routers/authenticate')
const connectDB = require('./mongoDb/mongodb');
const cookieParser = require('cookie-parser')

require('dotenv').config();


connectDB();

const app = express();

const port = process.env.PORT 
/* 
1. Application middlewares
2. Routes-level middlewares
3. Error-handling middlewares
4. built-in middlewares
5. Third-party middlewares
*/

//App level middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

//Routes
app.use('/api', AuthRouter);
app.use('/api', Userrouter);
app.use('/api', productRouter);
  
app.listen(port, () => {  
    console.log(`Server is running on port ${port}`);
});