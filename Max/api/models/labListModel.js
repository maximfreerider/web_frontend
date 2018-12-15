'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var FeedbackSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the Feedback'
  },
  Created_date: {
    type: String,
    default: String.now = function now(){
      var nowDate = new Date();
     return nowDate.getDate() + "." + (nowDate.getMonth() + 1) + "." + nowDate.getFullYear();
    }
  },
  title: {
    type:String,
    required: 'Kindly enter the name of the Feedback',
    default: ['title']
  }
});

module.exports = mongoose.model('Feedbacks', FeedbackSchema);