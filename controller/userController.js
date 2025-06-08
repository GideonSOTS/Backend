const User = require('../models/userSchema');
const bcrypt = require('bcryptjs')
const genToken = require('../jwt/genToken')
const createUser = async (req, res) => {
    const { username, gmail, password } = req.body;

        try {
            const returnedgmail = await User.findOne({ gmail });
        if (returnedgmail) {                                
            return res.json({ message: 'Email already exists!' }); 
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedpassword = bcrypt.hashSync(password, salt)
       const user = new User({username, gmail, password:hashedpassword});
       await user.save(); 
       res.json({message: 'User created successfully! proceed to login'});

    } catch (err) {
        console.log(err);
        res.json({errmessage:err.message});
    }
}

const readUser = async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            return res.status(200).json({ message: 'No user found!' });
        }
        res.json(user);
    } catch (err) {
        console.log(err.message);
    }
}

//Get the data from the url path from the client request
const getOneUser = async (req, res) => {
    // Stores the data in a variable. <req.params> is usually data from the url
    const { id } = req.params;
    //Go into database and find the document with the stored id
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(200).json({ message: 'No user found!' });
        }
    } catch (err) {
        console.log(err.message);
    }
}


const updateUser = async (req, res) => {
    const { id } = req.params;

    const { username, gmail, password } = req.body;
    
    try {
        const user = await User.findByIdAndUpdate(id, { username, gmail, password });
        if (!user) {
            return res.status(404).json({ message: `No user with the id ${id}` });
        }
        res.json({ message: 'User updated successfully!' });
    } catch (err) {
        console.log(err.message);
    }
}


const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: `No user with the id ${id}` });
        }
        res.json({ message: 'User deleted successfully!' });
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser,
    getOneUser
};