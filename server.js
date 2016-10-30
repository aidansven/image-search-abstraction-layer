var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('works!');
});

app.listen(3001, "localhost", function(){
    console.log('Success!')
    console.log('server.js is listening on port: ')
});