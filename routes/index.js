var express = require('express');
var router = express.Router();
var Widget = require('../models/widget')
var utils = require('../lib/utils')
var vbp = utils.validateBodyParams

/* GET home page. */
router.get('/', function(req, res, next) {
  utils.sendResource({API: "online"})
});

router.get('/widgets', function (req, res, next) {
    Widget.find(function(err, data) {
        if (err) {
            utils.sendError(res, err)
        } else {
            utils.sendCollection(req, res, data)
        }
    })
})

router.get('/widgets/:id', function(req, res, next) {
    Widget.findById(req.params.id, function(err, data) {
          if (err) utils.sendError(res, err)
          else {
              if (!data) res.sendStatus(404)
              else {
                  utils.sendResource(req, res, data)
              }
          }
    })
})

router.post('/widgets', function(req, res, next) {
    var expectedParams = [["name", "string"],
                          ["description", "string"],
                          ["number", "number"]]
    if (vbp(req, res, expectedParams)) {
        var obj = new Widget(req.body)
        obj.save(function(err) {
            if (err) utils.sendError(res, err)
            else {
                //newObj = mongoose.find(obj)
                utils.sendResource(req, res, obj)
                //res.sendStatus(201)
            }
    })}
})

router.delete('/widgets/:id', function(req, res, next) {
    Widget.findById(req.params.id, function(err, data) {
        if (err) utils.sendError(res, err)
        if (!data) res.sendStatus(404)
        else {
            data.remove(function(err) {
                if (err) res.sendError(res, err)
            })
            res.sendStatus(200)
        }
    })
})

router.put('/widgets/:id', function(req, res, next) {
    // Verify Body Parameters
    if (vbp(req, res,
        [["name", "string"],
         ["description", "string"],
         ["number", "number"]]))

    {
        Widget.findById(req.params.id, function(err, data) {
            if (err) utils.sendError(res, err)
            if (!data) res.sendStatus(404)

            data.name = req.body.name
            data.description = req.body.description
            data.number = req.body.number
            data.save(function(err) {
                if (err) utils.sendError(res, err)
                else utils.sendResource(req, res, data)
        })
    })}
})

module.exports = router;
