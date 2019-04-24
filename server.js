// importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var http = require('http');
var request = require("request");
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
const session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var app = express();
var routes = require('./routes/index');
var user = require('./routes/users');
var roles=  require('./routes/roles');
var resource=  require('./routes/resources');
var section=  require('./routes/sectionRoute');
var component  =  require('./routes/componentRoute');
var dbfs=  require('./routes/dbfs');
var blob=  require('./routes/blobStorage');
var cosmos=  require('./routes/cosmos');
var stage=  require('./routes/stages');
var project= require('./routes/project');
var application= require('./routes/application');
var dataSourceRoute = require('./routes/datasource');
var modelDataRoute = require('./routes/modelsroute');


const port = 3100;

const allowedExt = [
  '.js',
  '.html',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

// Configurations
global.CONFIGURATIONS ={ 
  dbHost: '216.168.41.41',
  dbPort: 9876,
  db: 'numtraplatform',
  username: 'dev',
  password: 'NumtraMongo123!',
  authdb: 'numtraplatform',
  ssl: false,
  bFAIrequestApi: 'http://24.16.119.69:7799',
  dbfsToken: 'dapi743e2d3cc92a32916f8c2fa9bd7d0606',
  dbfsDomain: 'https://westus.azuredatabricks.net',
  requestApi: '"http://192.168.23.180:2020'
}

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//session
app.use(express.static(path.join(__dirname,'client')));

app.use(bodyparser.json({
  limit: '50mb'
}));
app.use(bodyparser.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', store : new MongoStore(
  {
      url: 'mongodb://'+CONFIGURATIONS.dbHost + ':'+CONFIGURATIONS.dbPort
  }),
  resave: true, saveUninitialized: true }));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//app.use(cors());

app.use('/api', routes);
app.use('/user',user);
app.use('/role',roles);
app.use("/resources",resource);
app.use("/sections",section);
app.use("/components",component);
app.use('/dbfs',dbfs);
app.use('/blob',blob);
app.use('/cosmos',cosmos);
app.use('/stage',stage);
app.use('/project',project);
app.use('/application',application);


app.use('/dataSourceApi', dataSourceRoute);
app.use('/modelApi', modelDataRoute);


app.get('/user', (req, res) => res.json({
  application: 'Reibo collection'
}));

app.get('/api', (req, res) => res.json({
  application: 'Reibo collection'
}));

app.get('/resources', (req, res) => res.json({
  application: 'Reibo collection'
}));

app.get('/sections', (req, res) => res.json({
  application: 'Reibo collection'
}));

app.get('/components', (req, res) => res.json({
  application: 'Reibo collection'
}));

app.get('/dataSourceApi', (req, res) => res.json({
  application: 'Reibo collection'
}));

app.get('/modelApi', (req, res) => res.json({
  application: 'Reibo collection'
}));

app.get('/dbfs', (req, res) => res.json({
  application: 'Reibo collection'
}));

app.get('/blob', (req, res) => res.json({
  application: 'Reibo collection'
}));

app.get('/cosmos', (req, res) => res.json({
  application: 'Reibo collection'
}));

app.get('/stage', (req, res) => res.json({
  application: 'Reibo collection'
}));

app.get('/project', (req, res) => res.json({
  application: 'Reibo collection'
}));

app.get('/application', (req, res) => res.json({
  application: 'Reibo collection'
}));

app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
      res.sendFile(path.resolve(`client/dist/numtraPlatformV2/${req.url}`));
    } else {
      res.sendFile(path.resolve(__dirname, 'client/dist/numtraPlatformV2/index.html'));
    }
  });

//connect to db

var uri = 'mongodb://'+CONFIGURATIONS.dbHost +':'+CONFIGURATIONS.dbPort+'/' + CONFIGURATIONS.db;
console.log("Connecting to mongodb at '" + uri + "'" );

var opt = {
    db:{numberOfRetries:10},
    user: CONFIGURATIONS.username,
    pass: CONFIGURATIONS.password,
    server: {
        ssl: CONFIGURATIONS.ssl
    },
    auth: {
        authdb: CONFIGURATIONS.authdb
    }
};
mongoose.connect(uri,{ useNewUrlParser: true }, function(err, database) {
  if(err){ 
    console.log('Could not connect to mongodb.');
    throw err;
  } else {
    var db = database;
  //console.log(db);
    // Start the application after the database connection is ready

    var server = app.listen(port,'0.0.0.0',function(){
        console.log('Server started on port :'+port);
    });  
    io = require('socket.io').listen(server);
  }
});












