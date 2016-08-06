'use strict';

const queue = require('kue').createQueue(require('../config/queue'));

function createPayment(data, done) {  
  console.log('creating payment...');
  queue.create('payment', data)
    .priority('critical')
    .attempts(8)
    .backoff(true)
    .removeOnComplete(false)
    .save((err) => {
      if (err) {
        console.error(err);
        done(err);
      }
      if (!err) {
        done();
      }
    });
}


module.exports = {  
  create: (data, done) => {
    createPayment(data, done);
  }
};