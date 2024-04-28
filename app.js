const fs = require('fs')
const express = require('express')
const app = express();
const path = require('path')
app.set('view engine',"ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
    var arr = [];   
    fs.readdir(`./files`,function(err, files){
        files.forEach(function(file){
            let data = fs.readFileSync(`./files/${file}`,"utf-8");
            arr.push({title:file,data:data});
        })
        res.render("index",{arr:arr})
    })
})
app.post('/create',function(req,res){
    var name = req.body.title.split(" ").join('') + ".txt";
    fs.writeFile(`./files/${name}`,req.body.details,function(err){
        res.redirect('/');
    })
})
app.get('/delete/:user',function(req,res){
    fs.unlink(`./files/${req.params.user}`,function(err){
        console.log(err);
    })
    res.redirect("/")
})
app.get('/file/:username',function(req,res){
    var arr = []
    var userr = req.params.username
    let data = fs.readFileSync(`./files/${userr}`,"utf-8")
    arr.push({userr,data})
    res.render("readmore",{arr})
})
app.get('/edit/:username',function(req,res){
    var data = fs.readFileSync(`./files/${req.params.username}`,"utf-8")
    res.render("edit",{user:req.params.username,data})
})
app.post(`/edited`,function(req,res){
    var namee = req.body.head.split(" ").join('');
    fs.unlink(`./files/${namee}`,function(err){
        fs.writeFile(`./files/${namee}`,req.body.dets,function(err,file){})
        res.redirect("/")
    })
})
app.listen(5500)