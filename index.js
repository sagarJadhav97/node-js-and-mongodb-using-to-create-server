const express = require('express');
const app = express();
const userRouter = require('./Routers/userRouter');
const labRouter = require('./Routers/labRouter');
app.use(express.json());
app.use('/api/user',userRouter);
app.use('/api/lab',labRouter)
module.exports = app;