// const { urlencoded } = require("body-parser");
const express=require("express");
const path = require("path");
const app=express()
const fs=require('fs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname,'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.get("/", (req, res) => {
    fs.readdir(`./files`,function(err,files){
        res.render('index',{files:files});
    })
   
});
 
app.get('/file/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render('show',{filename:req.params.filename,filedata:filedata})
    })
})
app.post("/create",function(req,res){
    fs.writeFile(`./files/${req.body.title.split(''.join)}.txt`,req.body.details,function(err){
         res.redirect("/")
    })
})

app.listen(5000,function(){
    console.log("server is running on http:localhost:5000")
})