'use strict';


var mongoose = require('mongoose'),
  Feedback = mongoose.model('Feedbacks');

exports.list_all_feedbacks = function(req, res) {
  Feedback.find({}, function(err, Feedback) {
    if (err)
      res.send(err);
    res.json(Feedback);
  });
};




exports.create_a_feedback = function(req, res) {
  var new_feedback = new Feedback(req.body);
  new_feedback.save(function(err, Feedback) {
    if (err)
      res.send(err);
    res.json(Feedback);
  });
};


exports.read_a_feedback = function(req, res) {
  Feedback.findById(req.params.FeedbackId, function(err, Feedback) {
    if (err)
      res.send(err);
    res.json(Feedback);
  });
};


exports.update_a_feedback = function(req, res) {
  Feedback.findOneAndUpdate({_id: req.params.FeedbackId}, req.body, {new: true}, function(err, Feedback) {
    if (err)
      res.send(err);
    res.json(Feedback);
  });
};


exports.delete_a_feedback = function(req, res) {


  Feedback.remove({
    _id: req.params.FeedbackId
  }, function(err, Feedback) {
    if (err)
      res.send(err);
    res.json({ message: 'Feedback successfully deleted' });
  });
};


