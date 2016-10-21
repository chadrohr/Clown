let DataStore = require('nedb')
    , db = new DataStore({
        filename: './data/sightings.db', 
        autoload: true
    })


function Sighting(clownId, location,spotterId,time,date){
    this.clownId = clownId;
    this.location = location;
    this.spotterId = spotterId;
    this.time = time;
    this.date = date;
    this.dead = false;
}

function findSighting(id,cb){
    db.findOne({_id: id},cb);
    };
    

function addSighting(sighting, cb){
    var newSighting = new Sighting(sighting.clownId, sighting.location, sighting.spotterId, sighting.time, sighting.date)
    // sightings.push(newSighting)
    db.insert(newSighting, function(err, newSighting){
        if(err){
            return cb(err);
        }
    })
    return cb(null, {message:'Sightings are scary!!'})
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
    getSighting:findSighting

}