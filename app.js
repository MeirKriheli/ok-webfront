
/**
 * Module dependencies.
 */

var express = require('express')
    , hulk = require('hulk-hogan')
    , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.register('.html', hulk);
  app.set('view options',{layout:true});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/bills', routes.bills.index);
app.get('/bills/:id', routes.bills.show);
app.get('/agendas', routes.agendas.index);
app.get('/agendas/:id', routes.agendas.show);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
