
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
var conString = "postgres://production:dreamteam2014@localhost:5432/production";


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
		//console.log(result);
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

//Sends data to state page
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

app.get('/searching', function(req, res) {
  var lname = req.query.search;
  console.log(lname);
  pg.connect(conString, function(err, client, done){
    if(err){
      return console.error('error fetching client from pool', err);
    }
    query = 'SELECT f_name, l_name, mem_id FROM political_data.congressmen WHERE l_name ILIKE $1 ORDER BY l_name';
    console.log(query);
    client.query(query,[lname+'%'], function(err, results){
      console.log(results);
      res.render('search', {search: results});
    })
  })
});

//Route for committees page
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
  client.query('SELECT * from political_data.congressional_sub_committees WHERE parent_committee_id =$1',[req.params.comm_id], function(err, result) {
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
  client.query('SELECT * FROM political_data.congressmen_in_committee  JOIN political_data.congressmen USING(gov_track_id) WHERE sub_committee_id = $1 AND parent_committee_id = $2',[req.params.sub_comm_id,req.params.comm_id], function(err, result) {
    //call `done()` to release the client back to the pool
    done();
    if(err) {
      return console.error('error running query', err);
    }
    res.render('sub_committee_members',{title: 'Sub Committee Members', members: result});
  });
}); 
});


app.get('/trivia', function(req, res){
  res.render('trivia', {trivia: null});
})


app.get('/trivia/:choice', function(req, res) {
  var choice = req.params.choice;
  console.log("choice = " + choice);
  var query;
  switch(choice)
  {
    case 0:
      query = null;
      break;
    case '1': //youngest congressmen
      query = "SELECT f_name as First_Name, l_name AS last_name, to_char(birth_date, 'DD Mon YYYY') AS Birthday FROM political_data.congressmen ORDER BY birth_date DESC LIMIT 1";
      break;
    case '2': // oldest congressmen
      query = "SELECT f_name as First_Name, l_name AS last_name, to_char(birth_date, 'DD Mon YYYY') AS Birthday FROM political_data.congressmen ORDER BY birth_date ASC LIMIT 1";
      break;
    case '3': //list of congressmen under 40
      query = "SELECT f_name as First_Name, l_name AS last_name, to_char(birth_date, 'DD Mon YYYY') AS Birthday FROM political_data.congressmen WHERE birth_date > '1974-04-14' ORDER BY birth_date ASC";
      break;
    case '4': // does not have children?
      query = "SELECT f_name as First_Name, l_name AS last_name FROM political_data.congressmen WHERE has_child = 'f' ORDER BY birth_date ASC";
      break;
    case '5': // Party disbursement
      query = "SELECT religion, COUNT(religion) AS religion_count FROM political_data.congressmen GROUP BY religion ORDER BY religion_count DESC";
      break;
    case '6': // amount in each party
      query = "SELECT party, COUNT(party) AS party_count FROM political_data.congressmen GROUP BY party";
      break;
    case '7': //number in each session for house
      query = "SELECT session, COUNT(session) AS num_session FROM political_data.house_term GROUP BY session ORDER BY session DESC";
      break;
    case '8':// number in each session for senate
      query = "SELECT session, COUNT(session) AS num_session FROM political_data.senate_term GROUP BY session ORDER BY session DESC";
      break;
    case '9': //total funding from individuals
      query = "SELECT SUM(transaction_amt)::numeric::money AS total FROM political_data.funding_contributions_by_individuals";
      break;
    case '10': // Candidate funding
      query = "select name, occupation, transaction_amt::numeric::money AS amount_spent FROM political_data.funding_contributions_by_individuals  order by amount_spent desc limit 10;";
      break;
    case '11': //number of congressmen in each committee
      query = "WITH joined_congress AS(SELECT * FROM (SELECT gov_track_id AS gid, state_code, session FROM political_data.senate_term UNION SELECT gov_track_id AS gid, state_code, session FROM political_data.house_term) AS terms, political_data.congressmen WHERE terms.gid = congressmen.gov_track_id AND terms.session = 113)SELECT congressional_committees.committee_name, parent_committee_id, state_code, count(*)  FROM joined_congress, political_data.congressional_committees, political_data.congressmen_in_committee WHERE congressmen_in_committee.gov_track_id = joined_congress.gid AND congressmen_in_committee.session_number = 113 AND sub_committee_id = -1 AND congressional_committees.cong_cmte_id = parent_committee_id GROUP BY parent_committee_id, joined_congress.state_code, congressional_committees.committee_name ORDER BY parent_committee_id;";
      break;
    case '12': //Last four years of contributions by state
      query = "SELECT totals.s1 AS total_contributions, totals.state FROM (SELECT sum(transaction_amt)::numeric::money AS s1, state FROM political_data.funding_contributions_to_candidates_by_committees WHERE state IS NOT NULL  AND transaction_tp != '20Y' AND transaction_tp != '22Y' AND transaction_tp != '24T' AND transaction_dt >= '04/30/2010'  GROUP BY state ORDER BY state) AS totals ORDER BY totals.s1 DESC";
      break;
    case '13':
      query = "SELECT round(totals.s1::numeric/political_data.state_conts.s1::numeric, 4) * 100 AS percent_on_losers, totals.state  FROM (SELECT sum(transaction_amt)::numeric::money AS s1, state FROM political_data.funding_contributions_to_candidates_by_committees WHERE cand_id NOT IN( SELECT fec_id FROM political_data.congressmen WHERE fec_id IS NOT NULL  )AND state IS NOT NULL  AND transaction_tp != '20Y' AND transaction_tp != '22Y' AND transaction_tp != '24T' AND transaction_dt >= '04/30/2010'  GROUP BY state ORDER BY state) AS totals, political_data.state_conts WHERE state_conts.state = totals.state ORDER BY percent_on_losers DESC";
      break;
  }
  //console.log(query);
  if(query == null){
    res.render('trivia');
  } 
  else  {
     pg.connect(conString, function(err, client, done) {
        if(err) {
          return console.error('error fetching client from pool', err);
        }
        //query = client.query(query);
        console.log(query);
        client.query(query, function(err, result) {
          //query.on('row', function(row){
              //console.log(row);
             res.render('triviaq', {trivia: result});
          //})
            //call `done()` to release the client back to the pool
            done();
            if(err) {
              return console.error('error running query', err);
            }
        });
      }); 
  }
});

app.get('/random', function(req, res){
  res.send('Whee!')
});

app.get('/rep_profile/:rep', function(req, res){
  pg.connect(conString, function(err, client, done){
    var query = client.query("SELECT f_name, l_name, gov_track_id, gender, religion , party, married, has_child, to_char(birth_date, 'DD Mon YYYY') AS birthday FROM political_data.congressmen WHERE mem_id = $1", [req.params.rep]);
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
