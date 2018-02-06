var express = require('express'),
  http = require('http');

var fs = require('fs');
var teamsInfo = require('./data/teamsInfo.json');
var boardsInfo = require('./data/boardsInfo.json');
var result = require('./data/result.json');


var app = express()
  .use(express.bodyParser())
  .use(express.static('public'));

app.get('/teamsInfo', function  (req, res) {
  res.json(teamsInfo);
});

app.get('/boardsInfo', function  (req, res) {
  res.json(boardsInfo);
});

app.get('/result', function  (req, res) {
  res.json(result);
});

app.post('/result', function  (req, res) {
  result.push(req.body);
  fs.writeFile('./data/result.json', JSON.stringify(result));
  res.json(req.body);
     //res.status(404).end();
});

app.post('/result/:id', function  (req, res) {
  for(var j=0; j < result.length; j++) {
    if ((result[j].team1.id == req.params.id) && (result[j].week == req.body.week)) {
      result[j] = req.body;
      fs.writeFile('./data/result.json', JSON.stringify(result));
      res.json(req.body);
    };
  };
});

app.post('/teamsInfo', function  (req, res) {
  teamsInfo.push(req.body);
  fs.writeFile('./data/teamsInfo.json', JSON.stringify(teamsInfo));
  res.json(req.body);
  /*res.status(404).end();*/
});

app.post('/teamsInfo/updateAll', function  (req, res) {
  teamsInfo = req.body;
  fs.writeFile('./data/teamsInfo.json', JSON.stringify(teamsInfo));
  res.json(req.body);
});

app.post('/teamsInfo/:id', function  (req, res) {
  if ('updateAll' == req.params.id) {
    teamsInfo = req.body;
    fs.writeFile('./data/teamsInfo.json', JSON.stringify(teamsInfo));
    res.json(req.body);
  }
  else {
    for(var i=0; i < teamsInfo.length; i++ ){
      if(teamsInfo[i].id == req.params.id){

        teamsInfo[i] = req.body;
        fs.writeFile('./data/teamsInfo.json', JSON.stringify(teamsInfo));
        res.json(req.body);
        return;
      }
    }
  }

    res.status(400).end();

    
    /*console.log(req.body);      
    response.send(req.body);*/
});

app.get('/*', function  (req, res) {
  res.json(404, {status: 'not found'});
});

http.createServer(app).listen(3000, function () {
  console.log("Server ready at http://localhost:3000");
});