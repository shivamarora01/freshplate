const mongoose=require('mongoose')
const DB="mongodb://0.0.0.0:27017/DataBase"


mongoose.connect(DB)
.then(()=>{console.log("MONGO")})
.catch((err)=>{
    console.log("UNABLE")
})

module.exports=DB

// var MongoClient = require('mongodb').MongoClient;  
// var url = "mongodb://localhost:27017/MongoDatabase";  
// MongoClient.connect(url, function(err, db) {  
// if (err) throw err;  
// console.log("Database created!");  
// db.close();  
// });  

// mongoose.connect('mongodb://localhost/testDB', function (err) {
//     if (err) throw err;
//     console.log('Successfully connected');
//   })