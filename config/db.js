const mongoose = require ('mongoose');
const config = require ('config');
const { LogError } = require('concurrently');
const db = config.get('mongoURI');

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });

        console.log('MongoDB Connected');
    } catch(err){
        console.err(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

mongoose.set('strictQuery', true);

module.exports = connectDB;