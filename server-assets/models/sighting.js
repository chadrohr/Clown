let DataStore = require('nedb')
    , db = new DataStore({
        filename: './data/sightings.db', 
        autoload: true
    })
let Clown = require('./clown')

function Sighting(sighting){
    this.clownId = sighting.clownId;
    this.location = sighting.location;
    // this.spotterId = spotterId;
    this.time = Date.now();
    // this.date = date;
    // this.dead = false;
}

// function findSighting(id,cb){
//     db.findOne({_id: id},cb);
//     };

function findClownSightings(clownId,cb){
    db.find({clownId: clownId}, cb);
    };  

function addSighting(sighting, cb){
    Clown.getClown(sighting.clownId, function(err, clown){
        if(!clown || err){
            return cb({error: err, message: 'Sorry that didnt work'})
        }
    let newSighting = new Sighting(sighting)

    db.insert(newSighting, function(err, savedSighting){
        if(err){return cb(err)}
        clown.sightings = clown.sights || []
        clown.sightings.push(savedSighting._id)
        Clown.editClown(clown._id, clown, function(err){
            if(err){ cb(err)}
        cb (null,{message:'You are lucky to be alive'})
        })
    })
    })
}
function getSightings(cb){
    db.find({}, cb)
}

function killSighting(id,cb){
    db.update({_id: id},{$set: {dead: true}},{},cb)
    
    };

function editSighting(id, newSighting, cb){
    db.update(
    {_id: id},
    {$set:{
        clownId: newSighting.clownId,
        location: newSighting.location,
        spotterId: newSighting.spotterId,
        time: newSighting.time,
        date: newSighting.date

    }},{}, cb)
    
};
module.exports = {
    addSighting,
    getSightings,
    killSighting,
    editSighting,
    findClownSightings,
    getSighting:findSighting

}