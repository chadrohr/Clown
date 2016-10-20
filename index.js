let express = require('express');
let bodyParser = require('body-parser');
let Clown = require('./server-assets/routes/clown-routes');
let server = express();

server.use(express.static(__dirname + '/public'))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:true}));
server.use(Clown.routes);



server.listen(8080, function(){
    console.log({message:'Here come the clowns'})
})