
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
var conString = "postgres://nate:51147C0le@localhost:5432/nate";


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
//Jade stuff
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static( __dirname + '/public' ));



// Set the directory to get the views to be /views
//app.set('views', __dirname + '/views');

// Use the 'hbs' view engine
//app.set('view engine', 'jade');	//to use hbs instead of jade (cuz i dont wanna learn jade atm)

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

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true})
);

//Start of GET/POST pages

app.use(function(req, res, next){
  res.status(404);
  // respond with html page
  if (req.accepts('jade')) {
    res.render('404', { url: req.url });
    return;
  }
});

app.get('/', function(req, res) {
  res.render('index');
});

//Working on sending data to state page checkout state.jade
app.get('/state/:state',function(req, res) {
	state_code = state_name_to_code[req.params.state];
  pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * FROM political_data.congressmen JOIN political_data.house_term USING (gov_track_id) WHERE state_code = $1 AND session = $2',[state_code,113], function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
    rep_result = result;
      client.query('SELECT * FROM political_data.congressmen JOIN political_data.senate_term USING (gov_track_id) WHERE state_code = $1 AND session = $2',[state_code,113], function(err, result) {
      //call `done()` to release the client back to the pool
      done();
      if(err) {
        return console.error('error running query', err);
      }
      sen_result = result;
      res.render('state', {reps: rep_result, sens: sen_result, state_name: req.params.state, state_code: state_code});
    });
  });
});    
});


app.get('/tables', function(req, res) {
  res.render('tables');
});
	
app.get('/search/?q', function(req, res) {
  var query = req.query.q;
  res.render('search');
});

//ROute for committees page
app.get('/committees/', function(req,res){
  pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * from political_data.congressional_committees', function(err, result) {
    //call `done()` to release the client back to the pool
    done();
    if(err) {
      return console.error('error running query', err);
    }
    res.render('committees',{title: 'Committees', committees: result});
  });
}); 
});

//Route for sub committess
app.get('/committees/:comm_id', function(req,res){
  pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('select * from political_data.congressional_sub_committees where parent_committee_id =$1',[req.params.comm_id], function(err, result) {
    //call `done()` to release the client back to the pool
    done();
    if(err) {
      return console.error('error running query', err);
    }
    res.render('sub_committees',{title: 'Sub Committees', committees: result});
  });
}); 

});

//route for sub committe members
app.get('/committees/:comm_id/:sub_comm_id', function(req,res){
  pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('select * from political_data.congressmen_in_committee  JOIN political_data.congressmen USING(gov_track_id) WHERE sub_committee_id = $1 AND parent_committee_id = $2 AND session_number = 113',[req.params.sub_comm_id,req.params.comm_id], function(err, result) {
    //call `done()` to release the client back to the pool
    done();
    if(err) {
      return console.error('error running query', err);
    }
    res.render('sub_committee_members',{title: 'Sub Committee Members', members: result});
  });
}); 
});




app.get('/trivia/:query_num', function(req, res) {
  var query;
  switch(req.params.query_num)
  {
    case 0:
      query = null;
      break;
    case 1:
      query = "SELECT f_name, l_name, birth_date FROM congressmen ORDER BY birth_date DESC LIMIT 1"
      break;
  }
  if(query == null)
  {
    res.render('trivia');
  }
  /* pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query(query, function(err, result) {
    //call `done()` to release the client back to the pool
    done();
    if(err) {
      return console.error('error running query', err);
    }
    res.render('trivia')
  });
}); */
});

app.get('/rep_profile/:rep', function(req, res){
  pg.connect(conString, function(err, client, done){
    var query = client.query('SELECT * FROM political_data.congressmen WHERE mem_id = $1', [req.params.rep]);
    query.on('row', function(row){
      res.render('rep_profile', {layout : 'layout', rep: row, param: req.params.rep});
    }); 
  });
 
  //var url = req.url
  
}); 

app.get('/tables', function(req, res) {
  res.render('tables');
}); 

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
state_name_to_code={'Alabama': 'AL',
    'Alaska':'AK',
    'Arizona':'AZ',
    'Arkansas':'AR',
    'California':'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE' ,
    'District of Columbia': 'DC',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois':'IL',
    'Indiana': 'IN',
    'Iowa': 'IA' ,
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan':'MI',
    'Minnesota':'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana':'MT',
    'Nebraska':'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee':'TN',
    'Texas': 'TN',
    'Utah': 'UT',
    'Vermont':'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia':'WV',
    'Wisconsin':'WI',
    'Wyoming': 'WY'};