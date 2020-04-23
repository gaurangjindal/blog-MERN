const express = require('express');
require("dotenv").config();
const bodyparser = require('body-parser');
const PORT = process.env.PORT || 5001
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();


// middleware

app.use(bodyparser.json()); // here we have two method app.use and app.get, in app.use we read all the matches and in case of app.get we only get exact matched
app.use(bodyparser.urlencoded({extended:false}));
app.use('/api/users',require('./routes/api/users'));

app.use(passport.initialize());
require('./middleware/passport');

app.use('/api/pots',require('./routes/api/post'));


//db connection

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI,{
    useNewUrlParser :true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(()=> console.log('Db connected'));


app.get('/',(req,res)=>{
    res.send('hello'); 
});

app.post('/send',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
})

app.listen(PORT,()=>{
    console.log(`server is started at ${PORT}`);
})