
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
//var less = require('less');
var app = express();

// all environments
//app.set('port', process.env.PORT || 3000);
//Jade stuff
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

require('./setup')(app);


app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Start of GET/POST pages

app.get('/', function(req, res) {
  res.render('index');
});
app.get('/tables', function(req, res) {
  res.render('tables');
});



//app.get('/', routes.index); //jade stuff?
app.get('/users', user.list);

/*
app.get('*', function(req, res){
    res.render('404');
}); */

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
