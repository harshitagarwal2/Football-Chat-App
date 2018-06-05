'use strict'

const path = require('path');
const fs = require('fs');
const formidable = require('formidable');

module.exports = function(){
  return{
    setRouting: function(router){
      router.get('/dashboard', this.adminPage);

      router.post('/uploadFile', this.uploadFile);
    },
    adminPage: function(req,res){
      res.render('admin/dashboard');
    },
    uploadFile: function(req,res){
      const form = formidable.IncomingForm();
      form.uploadDir = path.join(__dirname, '../public/uploads');

      form.on()
    }
  }
}
