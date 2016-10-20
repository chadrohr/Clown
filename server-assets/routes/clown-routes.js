let routes = require('express').Router();
let Clown = require('../models/clown')
routes.route("/clowns/:id?")
    .get(function (req, res) {
        if (req.params.id) {
            Clown.getClown(req.params.id, handleResponse)
            return
        }
        Clown.getClowns(handleResponse)

        function handleResponse(err, data) {
            if(err){
                return res.send(err)
            }
        res.send(data)
        }
    })
    .post(function (req, res) {
        Clown.addClown(req.body.clown, function (err, data) {
            if (err) {
                return res.staus(err)
            }
            res.send(data)
        })
    })
    .put(function (req, res) {
        Clown.editClown(req.params.id, req.body.clown, function(err,data){
            if (err){
                return res.send({message: 'Almost right'})
            }
            res.send({message: 'GTG'})
        })
    })
    .delete(function (req, res) {
        Clown.killClown(req.params.id, function (err, numReplaced) {
            if (err) {
                return res.sendStatus(204).send(err)
            }
            res.sendStatus(200).send(numReplaced)
        })
    })
module.exports = { routes }