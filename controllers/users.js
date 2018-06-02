
 'use strict';
const passport = require('passport');

 module.exports = function(_, User) {

   return{
     setRouting:function(router){
       router.get('/', this.indexPage );
       router.get('/signup', this.getSignup);
       router.get('/home', this.homePage);
       router.post('/' , User.LoginValidation , this.postLogin);
       router.post('/signup' , User.SignUpValidation, this.postSignup);
     },

        indexPage: function(req,res){
            const errors = req.flash('error');
          return res.render('index', {test:'This is a test', title: 'Football chat | Login' , messages: errors, hasErrors: errors.length > 0});
        },

        postLogin: passport.authenticate('local.login', {
          successRedirect: '/home',
          failureRedirect: '/signup',
          failureFlash: true,
        }),

        getSignup: function(req,res){
          const errors = req.flash('error');
          return res.render('signup', {title: 'Footballchat | Signup', messages: errors, hasErrors: errors.length > 0, mycode:128474185});
        },
        postSignup: passport.authenticate('local.signup', {
          successRedirect: '/home',
          failureRedirect: '/signup',
          failureFlash: true,
        }),

        homePage: function(req,res){
          return res.render('home');
        }


   }
 }
