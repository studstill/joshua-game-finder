const Router = require('express').Router;
const Instances = require(__dirname + '/../models/instance');
const bodyParser = require('body-parser').json();
const errorHandler = require('./../lib/db_error_handler');
const http = require('http');

const instanceRouter = module.exports = Router();

// route for users to add new instance. This may need be the combinator for the game, location, user and time.
instanceRouter.post('/instances', bodyParser, (req, res) => {
  var newInstance = new Instance(req.body);
  newInstance.save((err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

instanceRouter.get('/instances', (req, res) => {
  Instances.find(null, (err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

instanceRouter.put('/instances/:id', bodyParser, (req, res) => {
  var instanceData = req.body;
  delete instanceData._id;
  Instances.update({ _id: req.params.id }, locationData, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200).json('Instance info updated');
  });
});

// Instances should eventually go away
instanceRouter.delete('/locations/:id', (req, res) => {
  Instances.remove({ _id: req.params.id }, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200).json({ msg: 'The instance has been removed.' });
  });
});
