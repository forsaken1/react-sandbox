var express = require('express');
var app = express();
var comments = require('./routes/comments');
var products = require('./routes/products');
var single_page = require('./routes/single_page');

GLOBAL.db = { 
  comments: [ { author: 'Петя', text: 'Комментарий 1' }, { author: 'Саша', text: 'Комментарий 2' } ],
  products: [
    { title: 'Продукт 1', count: 5, price: 345 },
    { title: 'Продукт 2', count: 0, price: 123 },
    { title: 'Продукт 3', count: 1, price: 654 },
  ],
};

app.set('view engine', 'jade');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/comments', comments);
app.use('/products', products);
app.use('/', single_page);

var server = app.listen(3003, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});