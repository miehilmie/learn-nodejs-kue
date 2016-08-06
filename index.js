var express = require('express');
var cluster = require('cluster');
var app = express();
var kue = require('kue');

if (cluster.isMaster) {

    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    
    var payments = require('./routes/payments');

    app.use('/queue', kue.app);

    app.use('/payments', payments);

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });


    app.listen(3000, () => {
      console.log('Example app listening on port 3000!');
    });

// Code to run if we're in a worker process
} else {
    require('./worker/payments');
}