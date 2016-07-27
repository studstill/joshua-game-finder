const Router = require('express').Router;
const Locations = require(__dirname + '/../models/location');
const bodyParser = require('body-parser').json();
const errorHandler = require('./../lib/db_error_handler');
const http = require('http');

const locationRouter = module.exports = Router();

// set up route for Admins to add new game locations
locationRouter.post('/locations', bodyParser, (req, res) => {
  var newLocation = new Locations(req.body);
  newLocation.save((err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

locationRouter.get('/locations', (req, res) => {
  Locations.find(null, (err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

// locations will need updates to hours or address
locationRouter.put('/locations/:id', bodyParser, (req, res) => {
  var locationData = req.body;
  delete locationData._id;
  Locations.update({ _id: req.params.id }, locationData, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(locationData);
  });
});

// some locations may go away, or they may be private locations
locationRouter.delete('/locations/:id', (req, res) => {
  Locations.remove({ _id: req.params.id }, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200).json({ msg: 'The location has been removed.' });
  });
});
