const express = require('express');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const http = require('http');
const container = require('./container');
 container.resolve(function(users){
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
       app.use(express.static('public'));
       app.set('view engine' , 'ejs');
       app.use(bodyparser.json());
       app.use(bodyparser.urlencoded({extended: true}));
     }
  });
