const mongoose = require('mongoose');

const connectDB = async () => {
    
    try {
            await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB:');
    } catch (err) {
        console.log(err.message);
    }
}   

module.exports = connectDB;