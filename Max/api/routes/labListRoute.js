'use strict';
module.exports = function(app) {
  
  var labList = require('../controllers/labListController');
  
  const cors = require('cors');
  const express = require('express');
  app.use(cors());
  app.options('*', cors());
  // labList Routes
  app.route('/feedbacks')
    .get(labList.list_all_feedbacks)
    .post(labList.create_a_feedback);
    

  
  app.route('/feedbacks/:feedbackId')
    .get(labList.read_a_feedback)
    // .put(labList.update_a_feedback)
    .delete(labList.delete_a_feedback);
  
  app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    
    
};


