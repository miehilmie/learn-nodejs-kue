'use strict';

const router = require('express').Router();

var paymentQueue = require('../queue/payments');

router.post('/', (req, res, next) => {
  // our future code will go here
  paymentQueue.create({
    title: 'Order #4kSvjL_Qx',
    name: 'hilmi',
    payment: 20
  }, function() {
    return res.send('hello');
  })
});

router.get('/', (req, res, next) => {

});

module.exports = router; 
