// Process up to 20 jobs concurrently
const queue = require('kue').createQueue(require('../config/queue'));
var process = require('process');

queue.watchStuckJobs(6000);

queue.on('ready', () => {  
  // If you need to 
  console.log('Queue is ready!');
});

queue.on('error', (err) => {  
  // handle connection errors here
  console.error('There was an error in the main queue!');
  console.error(err);
  console.error(err.stack);
});

queue.process('payment', function(job, done){  
  // other processing work here
  // ...
  // ...
  console.log('starting to process payment');
  for(var i = 0; i <= 100000; i++) {
      for(var j = 0; j <= 100000; j++) {
        if(i === 100000 && j === 100000) {
          console.log(i, j);
          
          done();
        }
      }
  }
  // Call done when finished
})

process.once('SIGTERM', function ( sig ) {
    console.log('shutting down..');
    queue.shutdown( 2000, function(err) {
        console.log( 'Kue shutdown: ', err||'' );
        process.exit( 0 );
    });
});
