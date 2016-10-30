var path = require('path');

var express = require('express');
var app = express();
var port = 3000;
app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.listen(port, function(){
    console.log('Success!');
    console.log('server.js is listening on port: ' + port);
});