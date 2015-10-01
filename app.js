var express = require('express');
var app = express();
var comments = require('./routes/comments');

GLOBAL.db = { comments: [ { author: 'Петя', text: 'Комментарий 1' }, { author: 'Саша', text: 'Комментарий 2' } ] };

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/comments', comments);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});