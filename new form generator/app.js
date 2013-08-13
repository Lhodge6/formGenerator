// includes
//--------------------------------------------------------------------------
var express = require('express'),
  https = require('https'),
  mongoose = require('mongoose'),
  config = require('./config');

var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    BSON = require('mongodb').BSONPure;

    
// start the app
//--------------------------------------------------------------------------
console.log('----------');
mongoose.connect(config.connectionstring);
    

// node/express init
//--------------------------------------------------------------------------
var app = express();
  
app.configure(function(){
    // tells express to compile our jade files to html
    app.set('view engine', 'jade');
    app.set('view options', { layout: false });
    // this allows static files in /public to be served automatically
    app.use(express.static(__dirname + '/public'));
    // parses the body of a request into a js object
    app.use(express.bodyParser());
});

app.configure('development', function(){
  // TODO: configure dev environment
});

app.configure('production', function(){
  // TODO: configure prod environment
});

    
// mongoose init
//--------------------------------------------------------------------------
var db = mongoose.connection;

db.on('error', function() {
  console.log('failed mongo connection :( check config.js\n  user %s\n  url %s\n  db %s\n----------',
    config.dbuser, config.dburl, config.dbname); 
});

db.once('open', function() { 
  console.log('mongo connected!\n  user %s\n  url %s\n  db %s\n----------',
    config.dbuser, config.dburl, config.dbname);

  var contactSchema = mongoose.Schema({
      description      : String,
      productNumber     : String,
      tag     : String,
      price  : String ,
      size  : String,
      bpc  : String,
      cases : String
  });

  var Contact = mongoose.model('Contact', contactSchema);

  // routes 
  //--------------------------------------------------------------------------
  app.get('/', function(req, res) {
      res.render('index');
  });

  app.get('/partials/:description', function(req, res) {
      res.render('partials/' + req.params.description);
  });

  app.get('/api/contacts', function(req, res) {
    Contact.find(function(err, contacts) {
      if (err) console.log('err getting contacts: ' + JSON.stringify(err));
      res.json(contacts);
    });
  });

  app.post('/api/addcontact', function(req, res) {
    var c = new Contact({
        description      : req.body.description,
        productNumber     : req.body.productNumber,
        tag     : req.body.tag,
        price  : req.body.price,
        size  : req.body.size,
        bpc  : req.body.bpc,
        cases  : req.body.cases
    });

    c.save(function(err, c) {
      if (err) 
        console.log('failure: ' + JSON.stringify(err));
      
      res.json(c);
    });
  });

  app.put('/api/updatecontact/:id', function(req, res) {
    Contact.findById(req.params.id, function(err, c) {
      if (err)
      {
        console.log('cant find contact: ' + JSON.stringify(err));
        res.send('error');
      }
      else
      {
        c.description = req.body.description;
        c.productNumber = req.body.productNumber;
        c.tag = req.body.tag;
        c.price = req.body.price;
        c.size = req.body.size;
        c.bpc = req.body.bpc;
        c.cases = req.body.cases;

        c.save(function(err, c) {
          if (err) 
            console.log('cant save contact: ' + JSON.stringify(err));
          
          res.json(c);
        });
      }
    });
  });  

  app.post('/api/deletecontact/:id', function(req, res) {
    Contact.remove({_id: req.params.id}, function(err) {
      if (err) 
        console.log('cant remove contact: ' + JSON.stringify(err));
        
      res.send(err);
    });
  });   

  // Start the server
  app.listen(config.port, function(){
    console.log("server started!\n  %s mode\n  port %d\n----------", app.settings.env, this.address().port);
  });

});