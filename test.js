var crypto = require('x-core')('crypto')
  , util = require('x-core')('util')
  
console.log('crypto.hash(string, [algo], [encoding])', ':' , crypto.hash('hello'))
console.log('util.sprintf()', ':', util.sprintf("[%10s]", 'monkey'))
util.printf("util.printf() : [%10s]", 'monkey')