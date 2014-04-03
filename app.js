
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require('passport');
//var less = require('less');

// Database connection. Modify conString for your own local copy
var pg = require('pg');
var conString = "postgres://karrde00@localhost/karrde00";

pg.connect(conString, function(err, client, done){
	if(err){
		return console.error('error fetching client from pool', err);
	}
	client.query('SELECT * FROM political_data.congressmen WHERE mem_id = 1', function(err, result){
		// calls `done()` to release the client back to the pool
		done();

		if(err){
			return console.error('error running query', err);
		}
		console.log(result);
		//output: 1
	});
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
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

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true})
);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

