var io = require('../app').io;


io.sockets.on('connection', function (client) {
    console.log('Client connected...');
});

module.exports=io;