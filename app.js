
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
app.set('port', process.env.PORT || 3000);
//Jade stuff
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(__dirname + '/public'));



// Set the directory to get the views to be /views
app.set('views', __dirname + '/views');

// Use the 'hbs' view engine
app.set('view engine', 'hbs');	//to use hbs instead of jade (cuz i dont wanna learn jade atm)

// Use the express development style logging
app.use(express.logger('dev'));

// Parses request input
app.use(express.bodyParser());

// Does the routing we'll define below!
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Start of GET/POST pages

app.use(function(req, res, next){
  res.status(404);
  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
});



app.get('/', function(req, res) {
  res.render('index');
});

app.get('/tables', function(req, res) {
  res.render('tables');
});
	
app.get('/search/?q', function(req, res) {
  var query = req.query.q;
  res.render('search');
});

app.get('/r/:rep', function(req, res) {
  /*var info = db.getInfo(req.params.id)
  res.render('r', {
    rep: info
  });*/
  var rep = req.params.rep;
  //var url = req.url
  res.render('r', {url:rep});
}); 

app.get('/tables', function(req, res) {
  res.render('tables');
}); 




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
