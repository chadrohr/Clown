let routes = require('express').Router();
let Sighting = require('../models/sighting')
routes.route("/sightings/:id?")
    .get(function (req, res) {
        if (req.params.id) {
            Sighting.getSighting(req.params.id, handleResponse)
            return
        }
        Sighting.getSightings(handleResponse)

        function handleResponse(err, data) {
            if(err){
                return res.send(err)
            }
        res.send(data)
        }
    })
    .post(function (req, res) {
        Sighting.addSighting(req.body.sighting, function (err, data) {
            if (err) {
                return res.staus(err)
            }
            res.send(data)
        })
    })
    .put(function (req, res) {
        Sighting.editSighting(req.params.id, req.body.sighting, function(err,data){
            if (err){
                return res.send({message: 'Almost right'})
            }
            res.send({message: 'GTG'})
        })
    })
    .delete(function (req, res) {
        Sighting.killSighting(req.params.id, function (err, numReplaced) {
            if (err) {
                return res.sendStatus(204).send(err)
            }
            res.sendStatus(200).send(numReplaced)
        })
    })
module.exports = { routes }