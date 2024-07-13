const exp = require("constants");
const express = require("express");
var methodOverride = require('method-override')
const app = express();
const { v4: uuidv4 } = require('uuid');


const port = 8080;


const path = require("path");

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}))

app.set("View engine", "ejs")
app.set("views",path.join(__dirname,"views"))

let post = [
    {
        id: uuidv4(),
        username: "yash",
        content: "I love Coding"
    },
    {
        id: uuidv4(),
        username: "Rohit",
        content: "Hardwork is achjieved"
    },
    {
        id: uuidv4(),
        username: "Rahul",
        content: "I got selected for my internship"
    }
]

app.get("/post",(req,res)=>{
    res.render("index.ejs",{ post });
})
app.get("/post/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/post",(req,res)=>{
    let {username,content} = req.body
    let id = uuidv4();
    post.push({ id,username , content });
     res.redirect('/post');
})

app.get("/post/:id",(req,res)=>{
    let {id} = req.params;
    let posts = post.find((p)=>id === p.id)
    console.log(posts)
    res.render("show.ejs",{posts});
})

app.patch("/post/:id",(req,res)=>{
    let {id} = req.params;
    let newcontent = req.body.content;
    let posts = post.find((p)=> id ===p.id);
    posts.content = newcontent
    res.redirect('/post');
})

app.get("/post/:id/edit",(req,res)=>{
    let {id} = req.params;
    let posts = post.find((p)=> id ===p.id);
    res.render('edit.ejs',{ posts});
})

app.delete("/post/:id",(req,res)=>{
    let {id} = req.params;
     post = post.filter((p)=> id !=p.id);
    res.redirect('/post');
})

app.listen(port, ()=> {
    console.log(`listening to port ${port}`);
});   