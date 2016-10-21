let DataStore = require('nedb')
    , db = new DataStore({
        filename: './data/clowns.db', 
        autoload: true
    })
let Sighting = require('.sighting')

function Clown(name, hair,shoeSize, weapon, psycho){
    this.name = name;
    this.hair = hair;
    this.shoeSize = shoeSize;
    this.weapon = weapon;
    this.psycho = psycho || true;
    this.dead = false;
    this.sightings = []
}

function findClown(id,cb){
    db.findOne({_id: id},cb);
    };
function findClownAndItLocations(id, cb){
  db.findOne({_id: id}, function(err, clown){
    if(err){ return cb(err)}
    Sighting.findClownSightings(clown._id, function(err, sightings){
      if(err) { return cb(err) }
      clown.sightingLocations = sightings
      cb(null, clown)
    })
  });
};

    

function addClown(clown, cb){
    var newClown = new Clown(clown.name, clown.hair, clown.shoeSize, clown.weapon, clown.psycho)
    // clowns.push(newClown)
    db.insert(newClown, function(err, newClown){
        if(err){
            return cb(err);
        }
    })
    return cb(null, {message:'Clowns are scary!!'})
}
function getClowns(cb){
    db.find({}, cb)
}

function killClown(id,cb){
    db.update({_id: id},{$set: {dead: true}},{},cb)
    
    };

function editClown(id, newClown, cb){
    db.update(
    {_id: id},
    {$set:{
        name: newClown.name,
        hair: newClown.hair,
        shoeSize: newClown.shoeSize,
        weapon: newClown.weapon,
        psycho: newClown.psycho,
        sightings: newClown.sightings

    }},{}, cb)
    
};
module.exports = {
    addClown,
    getClowns,
    killClown,
    editClown,
    findClownAndItLocation,
    getClown:findClown

}