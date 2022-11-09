const express = require('express');
const { engine } = require('express/lib/application');
const fast2sms = require('fast-two-sms')

const app = express();

require('dotenv').config();
app.set('view engine' ,'ejs')
app.use(express.urlencoded({extended:false}))
app.use('/sender',async(req,res)=>{
     var response = await fast2sms.sendMessage( {authorization : process.env.API_KEY , message : req.body.message ,  numbers : [req.body.numbers]})
     fast2sms.sendMessage(response)
})

app.get('/')