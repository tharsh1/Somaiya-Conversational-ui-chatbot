var express = require('express');
var app = express();
var path = require('path');
app.use(express.static('views'));

app.get("/",(req,res)=>{
    res.sendfile(path.join(__dirname + '/views/html/chatbot.html'));
});

app.get('/admin' , (req,res)=>{
    res.sendFile(path.join(__dirname + '/views/html/admin_dash.html'))
})
app.listen(3000);