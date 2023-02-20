const express=require('express');
const {PostModel}=require('../models/Post.model');

const postRouter=express.Router();

postRouter.get('/',async(req,res)=>{
    const {userID}=req.body;
    try{
        const posts=await PostModel.find({userID});
        res.send(posts);
    }catch(err){
        res.send(`Something went wrong while getting post: ${err}`);
    }
});

postRouter.get('/top',async(req,res)=>{
    const {userID}=req.body;
    try{
        const posts=await PostModel.find({userID,}).sort({no_of_comments:'desc'});
        res.send(posts);
    }catch(err){
        res.send(`Something went wrong while getting post: ${err}`);
    }
});


postRouter.post('/create',async(req,res)=>{
    const payload=req.body;
    try{
        const post=new PostModel(payload);
        await post.save();
        res.send('Post has been added')
    }catch(err){
        res.send(`Something went wrong while creating post: ${err}`);
    }
});

postRouter.patch('/update/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        await PostModel.findByIdAndUpdate(id,req.body);
        res.send(`Post of ID: ${id} has been updated`)
    }catch(err){
        res.send(`Something went wrong while updating post: ${err}`);
    }
});

postRouter.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        await PostModel.findByIdAndDelete(id);
        res.send(`Post of ID: ${id} has been deleted`)
    }catch(err){
        res.send(`Something went wrong while deleting post: ${err}`);
    }
});

module.exports={
    postRouter
}