// KzqSynOPI1jMPyem;
//xutao5661990;

const db =
  "mongodb+srv://xutao5661990:KzqSynOPI1jMPyem@coursecrud.xslbayt.mongodb.net/";
const mongoose = require("mongoose");

const connectDB = async ()=>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true
        })
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message);
        process.exit(1);
        
    }
}

module.exports = connectDB;