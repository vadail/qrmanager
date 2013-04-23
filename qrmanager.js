
// Module dependencies

var express = require('express')
  , routes = require('./routes')
  , pages = require('./routes/pages')
  , user = require('./routes/user')
  , qr = require('./routes/qr')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');


// Database

mongoose.connect('mongodb://localhost/qrmanager');

// Config

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/createqr', pages.createqr);
app.get('/getqrs', pages.getqrs);
app.get('/users', user.list);

// Route QRs

app.get('/api/qrs', qr.list);
app.post('/api/qrs', qr.create);
app.delete('/api/qrs/:id', qr.remove);
app.get('/api/qrs/:id', qr.find);
app.put('/api/qrs/:id', qr.update);

// Launch server

http.createServer(app).listen(app.get('port'), function(){
  console.log("QR Manager listening on port " + app.get('port'));
});
