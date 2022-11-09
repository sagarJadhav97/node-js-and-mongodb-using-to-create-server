const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = require('./index.js');

mongoose.connect(process.env.MONGODB_URL_SET,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

.then(() => console.log("connected to mongodb"))
.catch((error)=> console.log("Mongodb Connection Failed"));

const port = process.env.PORT || 3001

app.listen(port,()=>{
    console.log(`App running on port ${port}!`)
})