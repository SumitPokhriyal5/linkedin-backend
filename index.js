const express=require('express');
const cors=require('cors');
require('dotenv').config();
const {connection}=require('./config/db');
const {userRouter}=require('./routes/User.route');
const {postRouter}=require('./routes/Post.route');
const {authenticate}=require('./middlewares/authenticate')

const app=express()
app.use(cors());
app.use(express.json());

app.use('/users',userRouter);
app.use(authenticate);
app.use('/posts',postRouter);

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log(`Connected to DB`)
    }catch(err){
        console.log(`Cannot connect to DB: ${err}`)
    }
    console.log(`Server is running at http://localhost:${process.env.port}`);
})