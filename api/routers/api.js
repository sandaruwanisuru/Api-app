const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

router.get('/ninjas', function (req, res, next) {
  /* Ninja.find({}).then(function(ninjas){
        res.send(ninjas);
    }); */
  Ninja.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        }, // to get user input
        distanceField: 'dist.calculated',
        maxDistance: 1000000,
        spherical: true,
      },
    },
  ]).then(function (ninjas) {
    res.send(ninjas);
  });
});

router.post('/ninjas', (req, res, next) => {
  Ninja.create(req.body)
    .then((ninja) => {
      res.send(ninja); // to get again client side
    })
    .catch(next); // not sure, this is promises Ninja is model , create is mongo option insteadmake instance to promise
});

router.put('/ninjas/:id', (req, res, next) => {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Ninja.findOne({ _id: req.params.id }).then((ninja) => {
        res.send(ninja); // changing values finf
      });
    })
    .catch(next);
});

router.delete('/ninjas/:id', (req, res, next) => {
  Ninja.findByIdAndDelete({ _id: req.params.id }).then((ninja) => {
    res.send(ninja);
  });
});

module.exports = router;
