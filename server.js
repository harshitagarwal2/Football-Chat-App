const express = require('express');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const http = require('http');
const container = require('./container');
const cookieparser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');

const users= require('./controllers/users');

 container.resolve(function(users,_){

   mongoose.Promise = global.Promise;
   mongoose.connect('mongodb://localhost/footballchat');
    const app = SetupExpress();

    function SetupExpress() {
      const app = express();
      const server = http.createServer(app);
      server.listen(3000, function() {
        console.log('Listening on Port 3000');
      });
      configExpress(app);

      const router = require('express-promise-router')();
      users.setRouting(router);
      app.use(router);
    }

     function configExpress(app) {

      require('./passport/passport-local');

       app.use(express.static('public'));
       app.set('view engine' , 'ejs');
       app.use(bodyparser.json());
       app.use(bodyparser.urlencoded({extended: true}));
       app.use(cookieparser());

       app.use(validator());
       app.use(session({
         secret:'mysecretkey123454321qwerrty',
         resave: true,
         saveInitialized: true,
         store: new MongoStore({mongooseConnection: mongoose.connection})
       }));

       var mycode = 'String';

       app.use(flash());
       app.use(passport.initialize());
       app.use(passport.session());

       app.locals._ = _;
      }
  });
