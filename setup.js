// Import the necessary modules
var express = require('express')
  , path = require('path');


// Export this function as the module
module.exports = function(app) {


  // Express configuration and middleware
  app.configure(function(){

    // Set the port the application will run on to
    // the environment variable PORT or 3000
    app.set('port', process.env.PORT || 3000);

    // Set the directory to get the views to be /views
    app.set('views', __dirname + '/views');

    // Use the 'hbs' view engine
    app.set('view engine', 'hbs');

    // Use the express development style logging
    app.use(express.logger('dev'));

    // Parses request input
    app.use(express.bodyParser());

    // Does the routing we'll define below!
    app.use(app.router);
  });

  // When in development mode, use the error handler
  app.configure('development', function(){
    app.use(express.errorHandler());
  });

};