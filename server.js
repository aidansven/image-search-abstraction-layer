var path = require('path');
var request = require('request');
var url = require('url');
var express = require('express');
var app = express();
var port = 3000;
app.use(express.static(__dirname + '/client'));

var mongo = require('mongodb').MongoClient;
var urlMongo = 'mongodb://user:user@ds139847.mlab.com:39847/imgsearch-api-latest'


//home page, serve index
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'client/index.html'));
});



//api search page
app.get('/api', function(req, res){
    var d = new Date();
    var formDate = d.getMonth() + 1 + '/' + d.getDay() + '/' + d.getFullYear() + ' ' + d.getHours() + d.getMinutes() ;

    mongo.connect(urlMongo, function(err,db){
        if (err) throw err;
        var latest = db.collection('latest');
        latest.insert({
            search: req.url,
            time: formDate,
            unixTime: d.getTime()
        }, function(err, data){
            if (err) throw err;
        });
    });


    var options = {
        url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search' + url.parse(req.url).search,
        headers: {
            'Ocp-Apim-Subscription-Key': '6d031ee9dc494f96b377a85ff3c79299'
        }
    }
    request(options, function (error, response, body){
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            var myJSON = '[';
            for (var i = 0; i < 10; i++){
                myJSON += '{"img": "' + data.value[i].thumbnailUrl + '", ';
                myJSON += '"alt": "' + data.value[i].name + '", ';
                myJSON += '"url": "' + data.value[i].webSearchUrl + '"}';
                i < 9 ? myJSON += ', ' : myJSON += ']';
            }
            res.send(myJSON);
        } else {
            res.send(error);
        }
    });

});




//latest page
app.get('/latest', function(req, res){
    mongo.connect(urlMongo, function(err, db){
        if (err) throw err;
        var latest = db.collection('latest');
        latest.aggregate([
            {$sort: {unixTime: -1} },
            {$limit: 5},
            {$project: {_id: 0, time: 1, search: 1}}
        ], function(err, data){
            if (err) throw (err);
            var myJSON = data
            res.send(myJSON);
        });
    });

});



console.log('Success!');
app.listen(port, function(){
    console.log('server.js is listening on port: ' + port);
});