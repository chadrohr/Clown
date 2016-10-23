let DataStore = require('nedb');
let db = new DataStore({
    filename: './data/sightings.db',
    autoload: true
})
let Clown = require('./clown');

let moment = require('moment')
let d = new Date();

function Sighting(sighting) {
    this.clownId = sighting.clownId;
    this.location = sighting.location;
    this.spotter = sighting.spotter;
    this.date = sighting.date || moment(d).format("MMM Do YY");
    this.time = sighting.time || moment(d).format("h:mm:ss a");
    this.old = false;
}

function findClownSightings(clownId, cb){
    db.find({clownId: clownId}, cb)
}

function findSighting(id, cb) {
    db.findOne({ _id: id }, cb)
}

function addSighting(sighting, cb) {
    Clown.getClown(sighting.clownId, function (err, clown) {
        if (!clown || err) {
            return cb({ error: err, message: 'Sorry that did not work.' })
        }
        let newSighting = new Sighting(sighting);
        db.insert(newSighting, function (err, savedSighting) {
            if (err) {
                return cb(err)
            }
            clown.sightings = clown.sightings || []
            clown.sightings.push(savedSighting._id)
            Clown.editClown(clown._id, clown, function (err) {
                if (err) {
                    cb(err)
                }
                cb(null, { message: 'You are lucky to be alive with having seen ' + clown.name + ' the clown!' })
            })
        })
    })
}

function getSightings(cb) {
    db.find({}, cb)
}

function oldSighting(id, cb) {
    db.update({ _id: id }, { $set: { old: true } }, {}, cb)
}

function editSighting(id, newSighting, cb) {
    db.update({ _id: id }, {
        $set: {
            clownId: newSighting.clownId,
            location: newSighting.location,
            spotter: newSighting.spotter,
            date: newSighting.date,
            time: newSighting.time
        }
    }, {}, cb)
}

module.exports = {
    addSighting,
    getSightings,
    editSighting,
    oldSighting,
    getSighting: findSighting,
    findClownSightings
}